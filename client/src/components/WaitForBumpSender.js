import React from 'react'
import '../styles/button.css'
import '../styles/waitforbump.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import PropTypes from 'prop-types';
import FistsBumping from '../assets/FistsBumping.png'

class WaitForBumpSender extends React.Component {
  focusInterval = null;
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // The component needs focus in order to detect keypresses.
    // So we periodically set the focus back to this component
    // in case the user clicks something else.
    this.focusInterval = setInterval(function () {
      let bamButton = document.getElementById('bamButton');
      if (bamButton) { bamButton.focus() }
    }, 100);

    // if the permission to access Accelerometer data is granted
    if (this.props.senderAccPermission) {
      let isAccListenerActive = true
      window.addEventListener("devicemotion", (event) => {
        if (isAccListenerActive && 
          (Math.abs(event.acceleration.x) > 9 || Math.abs(event.acceleration.y) > 9)) {
          console.log(Math.abs(event.acceleration.x))
          // Deactivate the listener temporarily
          isAccListenerActive = false
          this.bamEvent()
          // After 5 seconds let the user be able to bump again
          setTimeout(function () {
            isAccListenerActive = true;
          }, 5000);
        }
      })
    }
  }

  // Called when a BAM! is triggered
  bamEvent = () => {
    const sensorData = {
      coordinates: this.props.senderLocationArr,
      date: Date.now(),
    }
    console.log("Sender coordinates: " + sensorData.coordinates)
    this.props.bumpCallback(sensorData);
  }

  // Called when the spacebar is pressed
  spaceBamEvent = (event) => {
    if (event.keyCode === 'Space') {
      clearInterval(this.focusInterval);
      this.focusInterval = null;
      this.bamEvent();
    }
  }

  render() {
    return (
      <div className="App">
        {
          !this.props.showSpinner &&
          <div>

            <button id="bamButton" className="test-button" onClick={this.bamEvent} onKeyPress={this.spaceBamEvent}>
              <img src={FistsBumping} className="fists-bumping-image-size" alt="Fist Bump Waiting Pic" />
            </button>

            <h1 className="text-style">
              <br />
              FIST BUMP THE DEVICES
              <br />
              TO INITIATE TRANSFER!
            </h1>
          </div>
        }



      </div>
    )
  }
}

// Prop validation
WaitForBumpSender.propTypes = {
  bumpCallback: PropTypes.func,
  senderLocationArr: PropTypes.array,
  senderAccPermission: PropTypes.bool,
  showSpinner: PropTypes.bool,
};

export default WaitForBumpSender
