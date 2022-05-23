import Header from "./Header"
import SuperheroName from "./SuperheroName"
import SendFiles from "./SendFiles"
import "../styles/button.css";
import "../styles/containers.css";
import WaitForBumpSender from './WaitForBumpSender'
import WaitForBumpReceiver from './WaitForBumpReceiver'
import React from 'react'
import { APIrecv, APIsend } from './ApiFetch'

class Home extends React.Component {
  constructor(props) {
    super(props);

    const { WebTorrent } = window  // Imports webtorrent from the window object

    this.state = {
      accPermission: false,       // Initially the permission to access to Accelerometer data is not given
      locationArr: [0,0],         // latitude and longitude
      appState: "Choosing",
      client: new WebTorrent(),   // This client should be passed down to all components
      magnetLink: "",
    }
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
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
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

  /**
   * Called by SendFiles when the user has pressed the "Send" button.
   * @param link: Magnet link send by SendFiles
   */
  pressedSendButtonCallback = (link) => {
    // Check if the device is mobile
    // Only mobile devices have Accelerometer sensor
    // If the permission is not given or the device is desktop, the app will
    // proceed to give the user a chance to simulate the bump by clicking the fist bump image
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      DeviceMotionEvent.requestPermission().then(response => {
        if (response == 'granted') {
          this.setState({
            accPermission: true, // Permission to access Accelerometer data is given by the receiver
          });
        }
      }).then(console.log("yoooooooooo"))
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
           appState: "ReadyToSend",
           magnetLink: link,
           locationArr: [lat, lng],
         });
         console.log("Magnet Link: ", link);
       }, () => {
         alert('Unable to retrieve your location, the App cannot proceed.');
       });
     }
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
      magnetLink: this.state.magnetLink,
      coordinates: sensorData.coordinates,
      date: sensorData.date,
    }

    APIsend(clientData);
  }

  /**
 * Called by WaitForBumpReceiver when a BAM/Bump has been detected
 * @param sensorData: Coordinates and Date received by WaitForBumpReceiver from db
 */
  receiverBumpCallback = (sensorData) => {
    console.log("Sender BAM!", sensorData);

    // Build the API request body
    const clientData = {
      name: "Placeholder",
      magnetLink: this.state.magnetLink,
      coordinates: sensorData.coordinates,
      date: sensorData.date,
    }

    APIrecv(clientData);
  }

  render() {
    return (
      <div className="App">
        {(this.state.appState == "Choosing" || this.state.appState == "WaitingToReceive") && <Header />}
        {this.state.appState == "Choosing" && <SuperheroName />}

        {(this.state.appState == "Choosing" || this.state.appState == "ReadyToSend") &&
          <SendFiles
            client={this.state.client}
            pressedSendButtonCallback={this.pressedSendButtonCallback}
          />}

        {this.state.appState == "ReadyToSend" && (
          <WaitForBumpSender bumpCallback={this.senderBumpCallback}
            senderAccPermission={this.state.accPermission}
            senderLocationArr = {this.state.locationArr} />
        )}

        {this.state.appState == "Choosing" && (
          <button
            type="button receive"
            className="button receiveFilesButton"
            onClick={this.onReceiveButtonClick}
          >
            RECEIVE FILES
          </button>
        )}

        {this.state.appState == "WaitingToReceive" && (

          <WaitForBumpReceiver
          client={this.state.client}
          bumpCallback={this.receiverBumpCallback}
          receiverAccPermission={this.state.accPermission}
          receiverLocationArr = {this.state.locationArr} />
        )}

        {(this.state.appState == "Choosing") && (
          <h3 id="location-status"></h3>
        )}

      </div>
    );
  }
}

export default Home
