import Header from "./Header"
import SuperheroName from "./SuperheroName"
import ChooseFiles from "./ChooseFiles"
import GetSensorData from "./GetSensorData"

import React from 'react'

const Home = () => {
  return (
    <div className = "App">
        <Header />
        <SuperheroName />
        <div className="ButtonSection">
            <ChooseFiles />
            <GetSensorData />
        </div>
    </div>
  )
}

export default Home