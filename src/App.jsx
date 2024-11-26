import React from "react";
import Die from "./components/Die"
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'

export default function App() {
  const [numbers, setNumbers] = React.useState(() => generateAllNewDice())
  
  const gameWon = numbers.every(num => (
    num.isHeld && numbers.every(number => number.value === num.value)
  ))

  function generateAllNewDice() {
    return new Array(10)
      .fill({})
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        id: nanoid(),
        isHeld: false,
      }));  
    }

  function newGame() {
    setNumbers(generateAllNewDice())
  }

  function rollDice() {
    setNumbers(prevArray => prevArray.map(die => (
      die.isHeld ?  
        die :
        {
          ...die,
          value: Math.ceil(Math.random() * 6),
        }
    )))
  }

  function holdDie(id) {
    setNumbers(prev => prev.map(item => {
      return item.id === id ? {...item, isHeld: !item.isHeld} : item;
  }))
}

  const diceElements = numbers.map(die => <Die key={die.id} value={die.value} hold={() => holdDie(die.id)} isHeld={die.isHeld}/>)

  return (
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="container">
          {diceElements}
        </div>
        {
          gameWon ?
            <button className="reroll" onClick={newGame}>New game</button> :
            <button className="reroll" onClick={rollDice}>Reroll</button>
        }
        {gameWon && <Confetti/>}
      </main>
  )
}
