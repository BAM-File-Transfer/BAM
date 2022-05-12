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
        //console.log("clicked ")
        DeviceMotionEvent.requestPermission().then(response => {
          if (response == 'granted') {
            console.log("accelerometer permission granted")
            window.addEventListener('deviceorientation',(event) => {
                // Expose each orientation angle in a more readable way
                // This will be refreshed too frequent if the refresh rate isn't defined
                let rotation_degrees = event.alpha;
                let frontToBack_degrees = event.beta;
                let leftToRight_degrees = event.gamma;
                // Print the acc sensor data to console
                console.log("Acc data: " + rotation_degrees + " " + frontToBack_degrees + " " + leftToRight_degrees)
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
