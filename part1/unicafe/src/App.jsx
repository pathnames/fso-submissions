import { useState } from 'react'

const StatisticsLine = ({text, value}) => {
  if (text === "positive") {
    return (
      <>
        <p>{text} {value}%</p>
      </>
    )
  }
  return (
    <>
      <p>{text} {value}</p>
    </>
  )
}
const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
      <h1>statistics</h1>
      <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={good + bad + neutral} />
      <StatisticsLine text="average" value={(good - bad) / (good + bad)} />
      <StatisticsLine text="positive" value={(good / (good + bad + neutral)) * 100} />
    </>
  )
}

const Button = ({eventHandler, text}) => {
  return (
    <>
      <button onClick={eventHandler}>{text}</button>
    </>
  )
}

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
      <Button eventHandler={increaseGood} text={"good"}/>
      <Button eventHandler={increaseNeutral} text={"neutral"}/>
      <Button eventHandler={increaseBad} text={"bad"}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App