import React from 'react'
import '../styles/button.css'
import '../styles/waitforbump.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import FistsBumping from '../assets/FistsBumping.png'

const WaitForBumpSender = () => {
  const navigate = useNavigate()
  return (
    <div className="App">
        <button className = "test-button" onClick={() => {
            navigate('/Progress')
        }}>Sender</button>
        <div className='fists-bumping-container'>
                <img src = {FistsBumping} className="fists-bumping-image-size" alt="Fist Bump Waiting Pic"/>
                <h1 className="text-style">
                    <br/>
                    FIST BUMP THE DEVICES
                    <br/>
                    TO INITIATE TRANSFER!
                </h1>
        </div>
        <button className = "red-button-bottom" onClick={() => {
            navigate('/')
        }}>CANCEL</button>
    </div>
  )
}

export default WaitForBumpSender
