import React from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [counter, SetCounter] = React.useState(0)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function hardMode() {
    const newDice = []
    for (let i = 0; i < 15; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function levelChanger() {
    setDice(hardMode())
  }

  function pressButton() {
    SetCounter(prev => prev + 1)
  }

  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDie()
      }))
    } else {
      setTenzies(false)
      SetCounter(-1)
      setDice(allNewDice())
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))


  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same.
        Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <div className="buttons-container">
        <button
          className="roll-dice"
          onClick={() => { rollDice(); pressButton() }}
        >
          {tenzies ? "New Game" : "Roll"}
        </button>
        <button
          className="roll-dice-hard"
          onClick={() => { levelChanger() }}
          style={{ display: (dice.length > 10 || tenzies === true) ? "none" : "block" }}
        >

          Hard Mode
        </button>
      </div>
      <p className="counter">"Roll" button clicked before winning - {counter}</p>
    </main>
  )
}