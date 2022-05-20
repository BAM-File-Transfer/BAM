import Header from "./Header"
import SuperheroName from "./SuperheroName"
import SendFiles from "./SendFiles"
import Receive from './Receive';
import TransferInProgress from "./TransferInProgress"

import React from 'react'

class Home extends React.Component {
  constructor(props) {
    super(props);

    const { WebTorrent } = window  // Imports webtorrent from the window object

    this.state = {
      client: new WebTorrent(),   // This client should be passed down to all components
      isCurrentlySending: false,
    }
  }

  /**
   * Called by ChooseFiles when it has started sending/seeding the files.
   */
  startedSending() {
    this.setState({ isCurrentlySending: true });
  }
  
  render() {
    return (
      <div className="App">
        <Header />
        <SuperheroName />
        <div className="ButtonSection">
          <SendFiles
            client = {this.state.client}
            startedSendingCallback = {this.startedSending}
          />
        </div>
        { this.state.isCurrentlySending && (<TransferInProgress />) }
        { !this.state.isCurrentlySending && (<Receive />) }
      </div>
    );
  }
}

export default Home