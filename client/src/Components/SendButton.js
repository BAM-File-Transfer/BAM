import React from "react"
import PropTypes from 'prop-types';

const SendButton = ({files}) => {    
    const onClick = () => {
        const { WebTorrent } = window  // Imports webtorrent from the window object
        let client = new WebTorrent();

        // Send files
        console.log(files);

        // https://webtorrent.io/intro
        client.seed(files, function (torrent) {
            console.log('Client is seeding ' + torrent.magnetURI);
        })
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
