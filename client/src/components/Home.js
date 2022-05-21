import Header from "./Header"
import SuperheroName from "./SuperheroName"
import SendFiles from "./SendFiles"
import Receive from './Receive';
import WaitForBumpSender from './WaitForBumpSender'
import React from 'react'

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