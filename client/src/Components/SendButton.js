import React from "react"

const SendButton = () => {
    const onClick = () => {
        const { WebTorrent } = window  // Imports webtorrent from the window object
        console.log("WebTorrent: ", WebTorrent);
        let client = new WebTorrent();
        console.log("Client: ", client);
        alert('Read the Console')
    }
    
    return (
        <div>
            <button className="button" onClick={onClick}>Send</button>
        </div>
    )
}

export default SendButton
