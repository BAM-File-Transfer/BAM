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
      appState: "Choosing",
      client: new WebTorrent(),   // This client should be passed down to all components
      magnetLink: "",
    }
  }

  onReceiveButtonClick = () => {
    this.setState({
      appState: "WaitingToReceive",
    });
  }

  /**
   * Called by SendFiles when the user has pressed the "Send" button.
   * @param link: Magnet link send by SendFiles
   */
  pressedSendButtonCallback = (link) => {
    this.setState({
      appState: "ReadyToSend",
      magnetLink: link,
    });
    console.log("Magnet Link: ", link);
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
          <WaitForBumpSender bumpCallback={this.senderBumpCallback} />
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
          bumpCallback={this.receiverBumpCallback} />
        )}

      </div>
    );
  }
}

export default Home