import Header from "./Header"
import SuperheroName from "./SuperheroName"
import ChooseFiles from "./ChooseFiles"
import Receive from "./Receive"

import React from 'react'

const Home = () => {
  return (
    <div className = "App">
        <Header />
        <SuperheroName />
        <div className="ButtonSection">
            <ChooseFiles />
            <Receive />
        </div>
    </div>
  )
}

export default Home