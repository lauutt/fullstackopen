import React, { useState } from 'react'
import ReactDOM from 'react-dom'

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

const Button = ({handleClick, title}) => {
  return (
      <button onClick={handleClick}>{title}</button>
  )
}

const Anecdote = ({value, anecdotes, votes, title}) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>
      {anecdotes[value]}
      </p>
      <p>Votes: {votes}</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const [selected, setSelected] = useState(0)
  const [a, setCopy] = useState(Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)
  const handleClick = () => {
    setSelected(getRandomArbitrary(0, anecdotes.length-1))
  }
  const handleVote = () => {
    const copy = [...a]
    copy[selected] += 1
    setCopy(copy)
    setMostVoted(copy.indexOf(Math.max(...copy)))
  }
  return (
    <div>
       <Anecdote value={selected} anecdotes={anecdotes} votes={a[selected]} title="Anecdote of the day"/>
       <Button handleClick={handleClick} title={"next sentence"}/>
       <Button handleClick={handleVote} title ={"vote"}/>
       <Anecdote value={mostVoted} anecdotes={anecdotes} votes={a[mostVoted]} title="Most Voted"/>
    </div>
  )
}
export default App
ReactDOM.render(<App />, 
  document.getElementById('root')
)