import Header from "./Header"
import SuperheroName from "./SuperheroName"
import ChooseFiles from "./ChooseFiles"

import React from 'react'

class Home extends React.Component {
  constructor(props) {
    super(props);

    const { WebTorrent } = window  // Imports webtorrent from the window object

    this.state = {
      client: new WebTorrent(),   // This client should be passed down to all components
    }
  }
  
  render() {
    return (
      <div className="App">
        <Header />
        <SuperheroName />
        <div className="ButtonSection">
          <ChooseFiles client={this.state.client} />
        </div>
      </div>
    );
  }
}

export default Home