import React from 'react'
import '../styles/button.css'
import '../styles/waitforbump.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import FistsBumping from '../assets/FistsBumping.png'

class WaitForBumpSender extends React.Component {
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

            <button className = "red-button-bottom" onClick={this.cancelSend}>CANCEL</button>
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
