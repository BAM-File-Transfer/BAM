import '../styles/button.css'
import '../styles/questionmark.css'

import React from 'react'
import BAMLogo from '../assets/BAMLogo.png'
import { useNavigate } from "react-router-dom"

const Header = () => {
  let navigate = useNavigate();
  return (
    <div className = "Header">
      <img src = {BAMLogo} className="bam-image-size" alt="BAM! Logo"/>
      <button className = "QuestionMark" onClick={() => {
        navigate("/About");
      }}>?</button>

    </div>
  )
}

export default Header
