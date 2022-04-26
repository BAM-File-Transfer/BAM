import '../styles/button.css'
import '../styles/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react"
import PropTypes from 'prop-types';

class SendButton extends React.Component {   
    constructor(props) {
        super(props);
        this.state = {
            files: this.props.files,
            torr: this.props.torr
        }
      } 

    updateTorrent(torrent){
        this.props.updateState({files: this.props.files, torr: torrent})
    }

    onClick = () => {
        const { WebTorrent } = window  // Imports webtorrent from the window object
        let client = new WebTorrent();

        // Send files
        console.log(this.props.files);

        // https://webtorrent.io/intro
        client.seed(this.props.files, function (torrent) {
            console.log('Client is seeding ' + torrent.magnetURI);
            let file = torrent.files.find(function (file) {
                return file.name.endsWith('')
            })
            file.getBlobURL(function callback(err, url) {
                if (err) throw err
                var receive_btn = document.getElementById('receive')
                receive_btn.download = file.name
                receive_btn.href = url
            })
        })
    }

    
    render(){
        return (
            <div>
                <button className="button" onClick={this.onClick}>Send</button>
                <a href="#" download="" id="receive"><button type = "button receive" className="button receiveFilesButton col-2">RECEIVE FILES</button></a>
            </div>
        )
    }
}

SendButton.propTypes = {
    files: PropTypes.object,
    torr: PropTypes.object,
    updateState: PropTypes.func
}

export default SendButton
