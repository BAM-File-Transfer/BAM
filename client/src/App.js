import './styles/App.css'
import React from 'react'
import ChooseFiles from './Components/ChooseFiles'
import Receive from './Components/Receive'
import SuperheroName from './Components/SuperheroName'
import Header from './Components/Header'
import SendButton from './Components/SendButton'

function App () {
  return (
    <div className="App">
      <Header />
      <SuperheroName />
      <div>
        <ChooseFiles />
            <Receive />
            <SendButton />
      </div>
    </div>
  )
}

export default App
