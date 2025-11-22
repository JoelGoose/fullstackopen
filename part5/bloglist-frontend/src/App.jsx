import { useState, useEffect, use } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({ message: '', type: '' })
  
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const setNotificationHelper = ({ message, type }) => {
    setNotification({message: message, type: type})
    setTimeout(() => {
      setNotification({message: '', type: ''})
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('login successful')
      setNotificationHelper({message: 'logged in successfully', type: 'success'})
    } catch {
      console.log('error in logging in')
      setNotificationHelper({message: 'wrong username or password', type: 'error'})
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    try {
      console.log('clicked logout')
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      setNotificationHelper({message: 'logged out successfully', type: 'success'})
    } catch {
      console.log('error in logging out')
    }
  }

const handleCreateBlog = async (event) => {
  event.preventDefault()
  try {
    const newBlog = { title, author, url }
    const returnedBlog = await blogService.create(newBlog) 
    setBlogs(blogs.concat(returnedBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
    setNotificationHelper({message: `a new blog ${title} by ${author} added`, type: 'success'})
  } catch (error) {
    console.error('Error creating blog:', error)
    setNotificationHelper({message: 'Error creating blog', type: 'error'})
  }
}

  if (user === null) {
    return (
      <><h2>Login</h2>
      <Notification message={notification.message} type={notification.type}/>
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        password={password}
        onUsernameChange={({ target }) => setUsername(target.value)}
        onPasswordChange={({ target }) => setPassword(target.value)} />
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.type}/>
      <div style={{ display: "flex" }}>
        <div>{user.name} logged in</div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <AddBlogForm 
        title={title}
        author={author}
        url={url}
        onTitleChange={({ target }) => setTitle(target.value)}
        onAuthorChange={({ target }) => setAuthor(target.value)}
        onUrlChange={({ target }) => setUrl(target.value)}
        handleCreateBlog={handleCreateBlog}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App