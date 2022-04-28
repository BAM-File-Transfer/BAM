import '../styles/button.css'
import React from 'react'

const Receive = () => {
  const handleClick = () => {
    alert('Receive Files')
  }

  return (
        <div className = "receivefiles">
            <button type = "button" className="button receiveFilesButton col-2" onClick={handleClick}>RECEIVE FILES</button>
        </div>
  )
}

export default Receive
