import React from 'react'
import '../styles/button.css'
import '../styles/waitforbump.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import FistsBumping from '../assets/FistsBumping.png'

class WaitForBumpSender extends React.Component {
    componentDidMount() {
      // if the permission to access Accelerometer data is granted
      if (this.props.senderAccPermission) {
        let isAccListenerActive = true
        window.addEventListener("devicemotion", (event) => {
          //let x_acceleration = event.acceleration.x;
          //let y_acceleration = event.acceleration.y;
          //let z_acceleration = event.acceleration.z;
          // if x axis acceleration is more than 20 m/s^2, a bump is detected
          if(isAccListenerActive && Math.abs(event.acceleration.x) > 15) {
            console.log(Math.abs(event.acceleration.x))
            // Deactivate the listener temporarily
            isAccListenerActive = false
            this.bamEvent()
            // After 5 seconds let the user be able to bump again
            setTimeout(function(){
                isAccListenerActive = true;
            }, 5000);
          }
        })
      }
    }
    constructor(props) {
        super(props);
    }

    bamEvent = () => {
        const sensorData = {
            coordinates: this.props.senderLocationArr,
            date: Date.now(),
        }
        this.props.bumpCallback(sensorData);
    }

    cancelSend = () => {
      useNavigate('/');
    }

    render(){ return (
        <div className="App">
            <button className = "test-button" onClick={this.bamEvent}>
              <img src = {FistsBumping} className="fists-bumping-image-size" alt="Fist Bump Waiting Pic"/>
            </button>

            <h1 className="text-style">
                <br/>
                FIST BUMP THE DEVICES
                <br/>
                TO INITIATE TRANSFER!
            </h1>

            </div>
    )}
}

// Prop validation
WaitForBumpSender.propTypes = {
    bumpCallback: PropTypes.func,
    senderLocationArr: PropTypes.array,
    senderAccPermission: PropTypes.bool,
};

export default WaitForBumpSender
