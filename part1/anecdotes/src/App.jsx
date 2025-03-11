import { useState } from 'react'


const Button = ({onClick, text}) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )
}

const MaxAnecdote = ({allVotes, anecdotes}) => {
  let max = 0
  let maxIndex = 0
  for (let i = 0; i < allVotes.length; i++) {
    if (allVotes[i] > max) {
      max = allVotes[i]
      maxIndex = i
    }
  }
  if (allVotes[maxIndex] > 0) {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        {anecdotes[maxIndex]}
        <br />
        has {max} votes
      </div>
    )
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
  }

  const randomAnecdote = () => {
    let idx = getRandomInt(anecdotes.length)
    setSelected(idx)
  }

  const increaseVote = () => {
    console.log(`Increasing vote for ${anecdotes[selected]} from ${votes[selected]} to ${votes[selected] + 1}`)
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      {anecdotes[selected]}
      <br />
      <Button onClick={increaseVote} text="vote"/>
      <Button onClick={randomAnecdote} text="next anecdote"/>
      <MaxAnecdote allVotes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App