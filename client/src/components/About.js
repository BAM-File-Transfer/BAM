import React from 'react'
import "../styles/about.css"
import "../styles/button.css"
import Header from './Header'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate = useNavigate()
  return (
    <div className="App">
      <Header />
        <h1 className="About">
            BAM! is a file sharing web application, designed to make the 
            process of sharing files between devices, quick, easy, and fun!
            <br/> <br/>
            <u>HOW TO USE:</u>
            <br/>
            Select the files that you would like to send.
            <br/> <br/>
            Fist bump the devices together!
            <br/> <br/>
            Download the files!
            <button className = "button" onClick={() => {
              navigate('/')
            }}>Start Sharing!</button>
        </h1>
    </div>
  )
}

export default About