import Header from "./Header"
import SuperheroName from "./SuperheroName"
import ChooseFiles from "./ChooseFiles"

import React from 'react'

const Home = () => {
  return (
    <div className = "App">
        <Header />
        <SuperheroName />
        <div>
            <ChooseFiles />
        </div>
    </div>
  )
}

export default Home