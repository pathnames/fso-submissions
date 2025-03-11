import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    console.log(`incrementing good by one, old value: ${good}`)
    setGood(good + 1)
  }

  const increaseBad = () => {
    console.log(`incrementing bad by one, old value: ${bad}`)
    setBad(bad + 1)
  }

  const increaseNeutral = () => {
    console.log(`incrementing neutral by one, old value: ${neutral}`)
    setNeutral(neutral + 1)
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={increaseGood}>good</button>
      <button onClick={increaseNeutral}>neutral</button>
      <button onClick={increaseBad}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>

    </div>
  )
}

export default App