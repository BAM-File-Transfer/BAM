import React from "react"
import Header from "./Header"
import SuperheroName from "./SuperheroName"
import '../styles/transferinprogress.css'
import '../styles/button.css'


const TransferInProgress = () => {
  return (
    <div className="App">
        <Header />
        <SuperheroName />
        <div className="transfertext">
          <button className = "button">SEND</button>
          <button className = "button">RECEIVE</button>

          <div className="text-style">
          Transfer In Progress
        </div>
        </div>
        
    </div>
  )
}

export default TransferInProgress