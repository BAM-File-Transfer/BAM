import React from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate = useNavigate()
  return (
    <div className="App">
      <Header />
        <h1 className="About">
            BAM! IS A FILE SHARING WEB APPLICATION, DESIGNED TO MAKE THE
            PROCESS OF SHARING FILES BETWEEN DEVICES QUICK, EASY, AND FUN!
            <br/> <br/>
            <u>HOW TO USE:</u>
            <br/>
            SELECT THE FILES THAT YOU WOULD LIKE TO SEND.
            <br/> <br/>
            FIST BUMP THE DEVICES TOGETHER!
            <br/> <br/>
            DOWNLOAD THE FILES!
            <button className = "button" onClick={() => {
              navigate('/')
            }}>Start Sharing!</button>
        </h1>
    </div>
  )
}

export default About