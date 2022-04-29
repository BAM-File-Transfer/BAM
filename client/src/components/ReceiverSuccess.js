import React from 'react'
import Header from './Header'
import SuperheroName from './SuperheroName'
import '../styles/button.css'
import '../styles/waitforbump.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'

const ReceiverSuccess = () => {
  const navigate = useNavigate()
  return (
    <div className="App">
        <Header />
        <SuperheroName />
        <div className='main-container'>
                <h1 className="text-style">
                    <br/>
                    (RECEIVER) SUCCESS!
                    <br/>
                    FILES RECEIVED LIST: (TO BE IMPLEMENTED)
                    <br/>
                </h1>
        </div>
        <button className = "red-button-bottom" onClick={() => {
            navigate('/')
        }}>DONE</button>
    </div>
  )
}

export default ReceiverSuccess
