import '../styles/button.css'
import '../styles/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react"
import PropTypes from 'prop-types';
import Receive from './Receive';
import { useNavigate } from 'react-router-dom'

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
            console.log('Client is seeding:\n' + torrent.magnetURI);
        })
        // --- Abdullah's Routing ---
        // navigate('/WaitForBump')
        const { navigation } = this.props;
        navigation('/WaitForBump')
   // }

  //  return (
   //     <div>
    //        <button className="button" onClick={onClick}>Send</button>
     //   </div>
    //)
      // --------------------------------
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
    files: PropTypes.object,
    navigation: PropTypes.func
}

export default function wrapper(props) {
  const navigation = useNavigate();
  return <SendButton {...props} navigation={navigation} />;
}

//export default SendButton
