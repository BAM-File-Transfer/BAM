import '../styles/button.css'
import '../styles/superheronamebox.css'

import React from 'react'

const SuperheroName = () => {
  return (
        <div className = "SuperheroName">
            <form>
                Superhero Name<br></br>
                <label>
                    <input type="text" className="SuperheroNameBox" name="name" placeholder="Enter Name"/>
                </label>
            </form>
        </div>
  )
}

export default SuperheroName
