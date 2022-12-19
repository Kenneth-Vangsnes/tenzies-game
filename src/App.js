import './App.css';
import React, {useState, useEffect} from 'react';
import Die from './Die';
import {nanoid} from 'nanoid'

function App() {
  const [dice, setDice] = useState(allNewDices())
  const [tenzies, setTenzies] = useState(false)
  
  useEffect(() => {
    if(dice.every((val, i, arr) => val.value === arr[0].value && val.isHeld === true )) {
       setTenzies(true) 
     } 
  }, [dice])

  function getNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }
  
  function allNewDices() {
    let array = []
    for(let i = 0; i < 10; i++) 
    array.push(getNewDice())
    return array
  }

  function rollDice() {
    if(tenzies === true) {      
    setDice(allNewDices())
    setTenzies(false)
    } else 
    setDice(oldDice => {
      return oldDice.map(dice => dice.isHeld ? {...dice} : getNewDice())
      })
    }
  
  
  function handleClick(id) {

    setDice(oldDice => {
      return oldDice.map(dice => dice.id === id 
        ? {...dice, isHeld: !dice.isHeld} 
        : {...dice})
    })
  }

  const diceElement = dice.map(dice => 
    <Die 
      key={dice.id}
      num={dice.value}
      onClick={handleClick}
      isHeld={dice.isHeld}
      id={dice.id}
    />
    )

  return (
  <div className="container">
    <h1 className='title'>
      Tenzies
    </h1>
    <p> Information about tenzies</p>
    <div className='dices'>
      {diceElement}
    </div>
    <button
      onClick={rollDice}
    >
      {tenzies ? "You Won" : "Roll"}
    </button>
  </div>  
  )
}

export default App;
