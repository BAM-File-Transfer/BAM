import '../styles/button.css'
import '../styles/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react"
import PropTypes from 'prop-types';
import Receive from './Receive';
import { APIsend } from './ApiFetch'
// import { useNavigate } from 'react-router-dom'

// --- Abdullah's Routing ---
//const SendButton = ({files}) => {
//    const navigate = useNavigate()
//    const onClick = () => {

// --- James's Geolocation ---
const getLocation = (callback) => {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser');
  } else {
    navigator.geolocation.getCurrentPosition((position) => {
      // can create variables to store longitude and latitide here (for putting in database / server use)
      let lat = position.coords.latitude
      let lng = position.coords.longitude
      callback([lat, lng])
    }, () => {
      alert('Unable to retrieve your location');
    });
  }
}

class SendButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: this.props.files
        }
      }
    // useNavigate(){}
    onClick = () => {

        const { WebTorrent } = window  // Imports webtorrent from the window object
        let client = new WebTorrent()

        // FILES TO SEND
        console.log(this.props.files)
        // CREATE TORRENT SEED
        client.seed(this.props.files, function (torrent) {
            console.log("Client is seeding:\n" + torrent.magnetURI);
            // Callback function lets the program wait until the geolocation
            // data is ready around 1-3 seconds
            getLocation(function (geolocation_arr) {
              // Send to API server
              const clientData = {
                  name: "Saitama",
                  magnetLink: torrent.magnetURI,
                  coordinates: geolocation_arr,
                  date: Date.now(),
              };
              console.log(clientData)
              APIsend (clientData);
            });
        })
    }

    render(){
        return (
            <div>
                <button className="button" onClick={this.onClick}>Send</button>
                <Receive />
            </div>
        )
    }
}

// DECLARING PROP TYPES
SendButton.propTypes = {
    files: PropTypes.object
}

export default SendButton
