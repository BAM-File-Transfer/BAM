import '../styles/button.css'
import '../styles/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react"
import PropTypes from 'prop-types';
import Receive from './Receive';
import { APIsend } from './ApiFetch'

class SendButton extends React.Component {   
    constructor(props) {
        super(props);
        this.state = {
            files: this.props.files,
            parentClickHandler: this.props.parentClickHandler,
            client: this.props.client,  // WebTorrent client from parent
        }
      }
    // useNavigate(){}
    onClick = () => {
        // FILES TO SEND
        console.log(this.props.files)
        // CREATE TORRENT SEED
        this.state.client.seed(this.props.files, function (torrent) {
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

        this.state.parentClickHandler();
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
    files: PropTypes.object,
    parentClickHandler: PropTypes.func,
    client: PropTypes.object,
}

export default SendButton
