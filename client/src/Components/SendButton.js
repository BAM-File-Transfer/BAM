import React from "react"
import PropTypes from 'prop-types';

const SendButton = ({files}) => {    
    const onClick = () => {
        const { WebTorrent } = window  // Imports webtorrent from the window object
        console.log("WebTorrent: ", WebTorrent);
        let client = new WebTorrent();
        console.log("Client: ", client);

        // Try to send files
        console.log("Inside SendButton")
        console.log(files); 
    }
    
    return (
        <div>
            <button className="button" onClick={onClick}>Send</button>
        </div>
    )
}

SendButton.propTypes = {
    files: PropTypes.object
}

export default SendButton
