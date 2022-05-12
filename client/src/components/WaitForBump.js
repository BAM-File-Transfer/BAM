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
  // Accelerometer event listener
  React.useEffect(() => {
    // If the bam image is clicked, we will ask for permission to get acc data
    // We can't ask this automatically, the user has to trigger the permission
    // event with a click or something else
    // The connection has to be HTTPS
    // Start by checking if the device is mobile
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      document.getElementById("bam-image").addEventListener('click', () => {
        DeviceMotionEvent.requestPermission().then(response => {
          if (response == 'granted') {
            console.log("accelerometer permission granted")
            window.addEventListener("devicemotion", (event) => {
                // This will be refreshed too frequent if the refresh rate isn't defined
                let x_acceleration = event.acceleration.x;
                let y_acceleration = event.acceleration.y;
                let z_acceleration = event.acceleration.z;
                // Print the acc sensor data to console
                console.log("X Acc: " + x_acceleration + "Y Acc: " + y_acceleration + "Z Acc: " + z_acceleration)
            })
          }
        })
      })
    } else {
      alert("This is a desktop device, unable to access acc sensors")
    }
  }, []);
  /*
  React.useEffect(() => {
    // check if the client is on mobile device
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      alert("this is a mobile device")
    }
  }, []);
  */

  return (
    <div className="App">
        <Header />
        <SuperheroName />
        {/*
        Sender and receiver buttons for routing
        <button className = "test-button" onClick={() => {
            navigate('/Progress')
        }}>Sender</button>
        <button className = "test-button" onClick={() => {
            navigate('/Progress')
        }}>Receiver</button>
        */}
        <div id = "bam-image" className='fists-bumping-container'>
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

export default WaitForBump
