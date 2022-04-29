import '../styles/button.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Receive = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    alert('Receive Files')
    navigate('/WaitForBump')
  }

  return (
        <div className = "receivefiles">
            <button type = "button" className="button receiveFilesButton col-2" onClick={handleClick}>RECEIVE FILES</button>
        </div>
  )
}

export default Receive
