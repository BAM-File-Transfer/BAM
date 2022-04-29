import '../styles/button.css'
import '../styles/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react"
import PropTypes from 'prop-types';
import Receive from './Receive';
// import { useNavigate } from 'react-router-dom'

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
            console.log('Client is seeding:\n' + torrent.magnetURI);
        })
        //navigate('/Progress')
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
