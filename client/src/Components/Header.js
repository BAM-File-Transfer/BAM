import '../styles/button.css'
import React from 'react'
import BAMLogo from '../assets/BAMLogo.png'

const Header = () => {
  return (
        <div className = "Header">
           <img src = {BAMLogo} className="bam-image-size" alt="BAM! Logo"/>
            <button>?</button>
        </div>
  )
}

export default Header
