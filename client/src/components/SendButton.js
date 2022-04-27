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
            torr: this.props.torr,
            fileList: []
        }
      }
    
    // ----------------------------------------------------------------------------
    // NOT WORKING. FUNCTIONS TO UPDATE THE PARENT STATE FROM THIS CHILD COMPONENT
    updateTorrent(torrent){
        this.props.updateState({files: this.props.files, torr: torrent})
    }
    updateFileList = (fileList) => {
        this.props.updateState({files: this.props.files, torr: this.props.torr, fileList: fileList})
    }
    // ----------------------------------------------------------------------------

    onClick = () => {
        const { WebTorrent } = window  // Imports webtorrent from the window object
        let client = new WebTorrent()

        // FILES TO SEND
        console.log(this.props.files)
        // CREATE TORRENT SEED
        client.seed(this.props.files, function (torrent) {
            console.log('Client is seeding:\n' + torrent.magnetURI);
            var index = 0
            var temp = []
            
            // LOOPS THROUGH TORRENT FOR FILE DATA. STORES EACH FILE IN TEMPORARY ARRAY CALLED temp
            torrent.files.forEach(function(file){
                // temporary code. will be replaced with updating Parent Component torr state
                temp[index] = file
                console.log(temp[index])
                index++
             })
            //RETURN FIRST FILE OF ANY TYPE
            let file = torrent.files.find(function (file) {
                return file.name.endsWith('')
            })
            // GET THE DOWNLOAD LINK FOR THE SINGLE FILE.
            // PASS DATA TO <a> HTML COMPONENT FOR DOWNLOAD
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
                {/* TEMPORARY RECEIVE BUTTON. WILL BE REPLACED LATER W/ RECEIVE COMPONENT */}
                <a href="#" download="" id="receive"><button type = "button receive" className="button receiveFilesButton col-2">RECEIVE FILES</button></a>
            </div>
        )
    }
}

// DECLARING PROP TYPES
SendButton.propTypes = {
    files: PropTypes.object,
    torr: PropTypes.object,
    updateState: PropTypes.func,
    updateFileList: PropTypes.func
}

export default SendButton
