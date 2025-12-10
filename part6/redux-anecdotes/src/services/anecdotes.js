const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return await response.json()
}

const createNew = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({ content, votes: 0 })
  }
  
  const response = await fetch(baseUrl, options)
  
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  return await response.json()
}

const vote = async (id) => {
  let response = await fetch(`${baseUrl}/${id}`)
  if (!response.ok) {
    throw new Error('Failed to find anecdote')
  }

  const anecdoteToChange = await response.json()

  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({...anecdoteToChange, votes: anecdoteToChange.votes + 1})
  }

  response = await fetch(`${baseUrl}/${id}`, options)
  if (!response.ok) {
    throw new Error('Failed to vote anecdote')
  }
  return await response.json()
}

export default { getAll, createNew, vote }