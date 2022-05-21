import React from 'react'
import '../styles/button.css'
import '../styles/waitforbump.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import FistsBumping from '../assets/FistsBumping.png'
import PropTypes from 'prop-types';

class WaitForBumpReceiver extends React.Component {
    constructor(props) {
        super(props);
    }

    cancelReceive = () => {
        useNavigate('/');
    }

    render(){ return (
        <div className="App">
            <button className = "test-button" onClick={this.bamEvent}>
              <img src = {FistsBumping} className="fists-bumping-image-size" alt="Fist Bump Waiting Pic"/>
            </button>
            
            <div className='fists-bumping-container'>
                <h1 className="text-style">
                    <br/>
                    FIST BUMP THE DEVICES
                    <br/>
                    TO INITIATE TRANSFER!
                </h1>
            </div>

            <button className = "red-button-bottom" onClick={this.cancelReceive}>CANCEL</button>
            </div>
    )}
}
//   const navigate = useNavigate()
//   return (
//     <div className="App">
//         <button className = "test-button" onClick={() => {
//             navigate('/Progress')
//         }}>Receiver</button>
//         <div className='fists-bumping-container'>
//                 <img src = {FistsBumping} className="fists-bumping-image-size" alt="Fist Bump Waiting Pic"/>
//                 <h1 className="text-style">
//                     <br/>
//                     FIST BUMP THE DEVICES
//                     <br/>
//                     TO INITIATE TRANSFER!
//                 </h1>
//         </div>
//         <button className = "red-button-bottom" onClick={() => {
//             navigate('/')
//         }}>CANCEL</button>
//     </div>
//   )
// }

// Declaring prop types
WaitForBumpReceiver.propTypes = {
    bumpCallback: PropTypes.func,
};

export default WaitForBumpReceiver