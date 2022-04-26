import React from 'react'
import Header from './Header'
import SuperheroName from './SuperheroName'
import '../styles/button.css'
import '../styles/waitforbump.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import FistsBumping from '../assets/FistsBumping.png'

const WaitForBump = () => {
  const navigate = useNavigate()
  return (
    <div className="App">
        <Header />
        <SuperheroName />
        <div className='fists-bumping-container'>
                <img src = {FistsBumping} className="fists-bumping-image-size" alt="Fist Bump Waiting Pic"/>
                <h1 className="text-style">
                    <br/>
                    FIST BUMP THE DEVICES
                    <br/>
                    TO INITIATE TRANSFER!
                </h1>
        </div>
        <button className = "fists-bumping-cancel" onClick={() => {
            navigate('/')
        }}>Cancel!</button>
    </div>
  )
}

export default WaitForBump
