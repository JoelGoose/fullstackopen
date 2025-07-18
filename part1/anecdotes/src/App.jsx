import { useState } from 'react'

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

// uses () instead of {}, which is an implicit return 
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

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

  // number from 0-7 (anecdotes.lenght is 8)
  const handleNextClick = () => {
    console.log('Next button clicked')
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVoteClick = () => {
    console.log('Vote Button clicked')
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const mostVotesIndex = votes.indexOf(Math.max(...votes))
  console.log('current vote array: ', votes)
  console.log('current selected anecdote: ', selected)
  return (
    <div>
      <Header text='Anecdote of the day' />
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <Button onClick={handleVoteClick} text='vote' />
      <Button onClick={handleNextClick} text='next anecdote' />
      <Header text='Anecdote with most votes' />
      <div>{anecdotes[mostVotesIndex]}</div>
      <div>has {votes[mostVotesIndex]} votes</div>
    </div>
  )
}

export default App