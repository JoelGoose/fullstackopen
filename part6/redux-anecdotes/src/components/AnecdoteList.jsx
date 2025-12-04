import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    else {
      return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    }
  })
  
  const vote = id => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    dispatch(createNotification(`You voted ${anecdotes.find(a => a.id === id).content}`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }
  
  const anecdotesSorted = [...anecdotes].sort(function(a, b) { return b.votes - a.votes })

  return(
    <div>
      {anecdotesSorted.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
} 

export default AnecdoteList