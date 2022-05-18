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

            // Send to API server
            const clientData = {
                name: "Saitama",
                magnetLink: torrent.magnetURI,
                coordinates: [115, 115],
                date: Date.now(),
            };
            APIsend (clientData);
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
