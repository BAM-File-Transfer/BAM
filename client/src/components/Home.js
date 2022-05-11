import Header from "./Header"
import SuperheroName from "./SuperheroName"
import ChooseFiles from "./ChooseFiles"
import GetLocation from "./GetLocation"

import React from 'react'

const Home = () => {
  return (
    <div className = "App">
        <Header />
        <SuperheroName />
        <div className="ButtonSection">
            <ChooseFiles />
            <GetLocation />
        </div>
    </div>
  )
}

export default Home