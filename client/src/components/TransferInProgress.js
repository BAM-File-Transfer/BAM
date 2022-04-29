import React from "react"
import Header from "./Header"
import SuperheroName from "./SuperheroName"
import '../styles/transferinprogress.css'
import '../styles/button.css'
import { useNavigate } from 'react-router-dom'

const TransferInProgress = () => {
  const navigate = useNavigate()
  return (
    <div className="App">
        <Header />
        <SuperheroName />
        <div className="transfertext">
          <button className = "button" onClick={() => {
              navigate('/SenderSuccess')
          }}>SEND</button>
          <button className = "button" onClick={() => {
              navigate('/ReceiverSuccess')
          }}>RECEIVE</button>

          <div className="text-style">
          Transfer In Progress
        </div>
        </div>

    </div>
  )
}

export default TransferInProgress
