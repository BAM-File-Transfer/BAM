import Header from "./Header"
import SuperheroName from "./SuperheroName"
import SendFiles from "./SendFiles"
import "../styles/button.css";
import "../styles/containers.css";
import '../styles/transferinprogress.css'
import WaitForBumpSender from './WaitForBumpSender'
import WaitForBumpReceiver from './WaitForBumpReceiver'
import FileTransfer from "./FileTransfer";
import React from 'react'
import { APIrecv, APIsend } from './ApiFetch'
const { WebTorrent } = window  // Imports webtorrent from the window object

class Home extends React.Component {
  client = new WebTorrent();
  receiverInterval = null;
  senderInterval = null;

  constructor(props) {
    super(props);

    this.state = {
      accPermission: false,       // Initially the permission to access to Accelerometer data is not given
      locationArr: [0,0],         // latitude and longitude
      appState: "Choosing",
      uploadSpeed: 0,
      progress: 0,
      magnetLink: "",
      showSpinner: false,
    }
  }

  onCancelButtonClick = () => {
    // App State
    this.setState({
      appState: "Choosing",
      uploadSpeed: 0,
      progress: 0,
    });

    // Remove current torrent
    if(this.client.torrents[0] != null){
      this.client.remove(this.client.torrents[0], false);
    }

    // Clear Intervals
    clearInterval(this.senderInterval);
    clearInterval(this.receiverInterval);
    this.senderInterval = null;
    this.receiverInterval = null;
  }

  // Sets the state to WaitingToReceive and
  // Asks for permission to use Accelerometer data
  // Gets the geolocation data before proceeding to next state to save time
  // Fetching Geolocation data takes 1-5 seconds
  onReceiveButtonClick = () => {
    // Check if the device is mobile
    // Only mobile devices have Accelerometer sensor
    // If the permission is not given or the device is desktop, the app will
    // proceed to give the user a chance to simulate the bump by clicking the fist bump image
    // Only IOS requires apps to ask for permission to use the Accelerometer sensor
    if( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
      DeviceMotionEvent.requestPermission().then(response => {
        if (response == 'granted') {
          this.setState({
            accPermission: true, // Permission to access Accelerometer data is given by the receiver
          });
        }
        // The user must give the app permission to access geolocation data
        if (!navigator.geolocation) {
          alert('Geolocation is not supported by your browser, the App cannot proceed.');
        } else {
          document.getElementById("location-status").innerHTML = "Getting the location data... (Estimated loading time 5 seconds)";
          navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude
            let lng = position.coords.longitude
            this.setState({
              appState: "WaitingToReceive",
              locationArr: [lat, lng],
            });
          }, () => {
            alert('Unable to retrieve your location, the App cannot proceed.');
          });
        }
      })
    } else if( /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        this.setState({
          accPermission: true, // Permission to access Accelerometer data is given by the receiver
        });
        // The user must give the app permission to access geolocation data
        if (!navigator.geolocation) {
          alert('Geolocation is not supported by your browser, the App cannot proceed.');
        } else {
          document.getElementById("location-status").innerHTML = "Getting the location data... (Estimated loading time 5 seconds)";
          navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude
            let lng = position.coords.longitude
            this.setState({
              appState: "WaitingToReceive",
              locationArr: [lat, lng],
            });
          }, () => {
            alert('Unable to retrieve your location, the App cannot proceed.');
          });
        }
    } else {
      // The user must give the app permission to access geolocation data
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser, the App cannot proceed.');
      } else {
        document.getElementById("location-status").innerHTML = "Getting the location data... (Estimated loading time 5 seconds)";
        navigator.geolocation.getCurrentPosition((position) => {
          let lat = position.coords.latitude
          let lng = position.coords.longitude
          this.setState({
            appState: "WaitingToReceive",
            locationArr: [lat, lng],
          });
        }, () => {
          alert('Unable to retrieve your location, the App cannot proceed.');
        });
      }
    }
  }

  spinnerCallback = (flag) => {
    this.setState({
      showSpinner: flag
    })
  }

  /**
   * Called by SendFiles when the user has pressed the "Send" button.
   * @param torrent: Torrent sent by SendFiles and acceleration permission response
   */
  pressedSendButtonCallback = (torrent) => {
     // The user must give the app permission to access geolocation data
     if (!navigator.geolocation) {
       alert('Geolocation is not supported by your browser, the App cannot proceed.');
     } else {
       document.getElementById("location-status").innerHTML = "Getting the location data... (Estimated loading time 5 seconds)";
       navigator.geolocation.getCurrentPosition((position) => {
         let lat = position.coords.latitude
         let lng = position.coords.longitude
         this.setState({
           appState: "ReadyToSend",
           torrent: torrent[0],
           locationArr: [lat, lng],
           accPermission: torrent[1],
         });
       }, () => {
         alert('Unable to retrieve your location, the App cannot proceed.');
       });
     }
     this.setState({
       showSpinner: false,
     })
  }

  /**
   * Called by WaitForBumpSender when a BAM/Bump has been detected
   * @param sensorData: Coordinates and Date sent by WaitForBumpSender
   */
  senderBumpCallback = (sensorData) => {
    console.log("Sender BAM!", sensorData);

    // Build the API request body
    const clientData = {
      name: "Placeholder",
      magnetLink: this.client.torrents[0].magnetURI,
      coordinates: sensorData.coordinates,
      date: sensorData.date,
    }

    APIsend(clientData);

    // Update Upload Speed
    this.senderInterval = setInterval(() => {
      this.setState({uploadSpeed: this.client.uploadSpeed})
    }, 250);
  }

  /**
 * Called by WaitForBumpReceiver when a BAM/Bump has been detected
 * @param sensorData: Coordinates and Date received by WaitForBumpReceiver from db
 */
   receiverBumpCallback = (sensorData) => {
    console.log("Receiver BAM!", sensorData);

    // Build the API request body
    const clientData = {
      name: "Superman",
      coordinates: sensorData.coordinates,
      date: sensorData.date,
    };

    //TODO Enable loading spinner
    this.setState({
      showSpinner: true,
    })

    APIrecv(clientData).then((response) => {
      //TODO Disable loading spinner
      this.setState({
        showSpinner: false,
      })
      if(response.magnetLink){
        this.setState({
          magnetLink: response.magnetLink,
          appState: "Transfer"
        })
        // Update Download Progress
        if (this.receiverInterval == null) {
          this.receiverInterval = setInterval(() => {
            console.log("Progress: ", this.client.progress);
            this.setState({ progress: this.client.progress });

            // Stop updating when done downloading
            this.client.torrents.forEach(torrent => {
              if (torrent.done == true) {
                clearInterval(this.receiverInterval);
                this.receiverInterval = null;
              }
            });
            
          }, 250);      
        }
      } 
    })
    // .then(() => {
    //   else{
    //     this.setState({appState: "WaitingToReceive"})
    //   }
    // })
  }

  transferBumpCallback = () => {
    this.setState({appState: "Choosing"})
  }

  /**
 * Called by WaitForBumpReceiver when a BAM/Bump has been detected
 * @param sensorData: Coordinates and Date received by WaitForBumpReceiver from db
 */
  // receiverBumpCallback = () => {
  //   // Update Download Progress
  //   if (this.receiverInterval == null) {
  //     this.receiverInterval = setInterval(() => {
  //       console.log("Progress: ", this.client.progress);
  //       this.setState({ progress: this.client.progress });

  //       // Stop updating when done downloading
  //       this.client.torrents.forEach(torrent => {
  //         if (torrent.done == true) {
  //           clearInterval(this.receiverInterval);
  //           this.receiverInterval = null;
  //         }
  //       });
        
  //     }, 250);      
  //   }
  // }

  render() {
    return (
      <div className="App">
        {(this.state.appState == "Choosing") && <Header />}
        {this.state.appState == "Choosing" && <SuperheroName />}

        {(this.state.appState == "Choosing" || this.state.appState == "ReadyToSend") &&
          <SendFiles
            client={this.client}
            appState={this.state.appState}
            spinnerCallback={this.spinnerCallback}
            pressedSendButtonCallback={this.pressedSendButtonCallback}/>
        }

        
        {this.state.showSpinner &&
          <div>
            <h1>Loading...</h1>
            <div className="loader">Looking for match...</div>
          </div>
        }

{this.state.appState == "ReadyToSend" && (
          <WaitForBumpSender 
            bumpCallback={this.senderBumpCallback}
            senderAccPermission={this.state.accPermission}
            senderLocationArr = {this.state.locationArr} />
        )}

        {this.state.appState == "Choosing" && (
          <button
            type="button receive"
            className="button receiveFilesButton"
            onClick={this.onReceiveButtonClick}>
            RECEIVE FILES
          </button>
        )}

        {(this.state.appState == "WaitingToReceive" && !this.state.showSpinner) && (
          <WaitForBumpReceiver
            bumpCallback={this.receiverBumpCallback}
            spinnerCallback={this.spinnerCallback}
            receiverAccPermission={this.state.accPermission}
            receiverLocationArr = {this.state.locationArr} />
        )}

        {this.state.appState == "Transfer" && (
          <FileTransfer
            client={this.client}
            magnetLink={this.state.magnetLink}
            bumpCallback={this.transferBumpCallback} />
        )}

        {(this.client.progress > 0) && (<p>Progress: {(this.state.progress * 100).toFixed(2)}%</p>)}
        {(this.state.uploadSpeed != 0) && <p>Upload Speed: {this.state.uploadSpeed} bytes/sec</p>}

        {(this.state.appState == "ReadyToSend" || 
          this.state.appState == "WaitingToReceive" || 
          this.state.appState == "Transfer") && (
          <button
            className="red-button-bottom"
            onClick={this.onCancelButtonClick}>
            CANCEL
          </button>
        )}

        {(this.state.appState == "Choosing") && (
          <h3 id="location-status"></h3>
        )}

      </div>
    );
  }
}

export default Home
