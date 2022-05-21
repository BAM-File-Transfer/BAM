import Header from "./Header"
import SuperheroName from "./SuperheroName"
import SendFiles from "./SendFiles"
import Receive from './Receive';
import WaitForBumpSender from './WaitForBumpSender'
import React from 'react'
import { APIsend } from './ApiFetch'

class Home extends React.Component {
  constructor(props) {
    super(props);

    const { WebTorrent } = window  // Imports webtorrent from the window object

    this.state = {
      client: new WebTorrent(),   // This client should be passed down to all components
      isCurrentlySending: false,
      magnetLink: "",
    }
  }

  /**
   * Called by SendFiles when it has started sending/seeding the files.
   * Returns the magnet link.
   */
  pressedSend = (link) => {
    this.setState({
      isCurrentlySending: true,
      magnetLink: link,
    });
    console.log("Magnet Link: ", link);
  }

  /**
   * Called by WaitForBumpSender when it wants to initiate a BAM
   */
  senderBAM = (sensorData) => {
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
  
  render() {
    return (
      <div className="App">
        <Header />
        <SuperheroName />
        <div className="ButtonSection">
          <SendFiles
            client = {this.state.client}
            startedSendingCallback = {this.pressedSend}
          />
        </div>

        { /* Conditional Rendering */ }
        { this.state.isCurrentlySending && (<WaitForBumpSender bamCallback = {this.senderBAM} />) }
        { !this.state.isCurrentlySending && (<Receive />) }
      </div>
    );
  }
}

export default Home