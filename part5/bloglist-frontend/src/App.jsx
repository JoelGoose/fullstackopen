import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({ message: '', type: '' })

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a,b) => b.likes - a.likes))
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
    setNotification({ message: message, type: type })
    setTimeout(() => {
      setNotification({ message: '', type: '' })
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
      setNotificationHelper({ message: 'logged in successfully', type: 'success' })
    } catch {
      console.log('error in logging in')
      setNotificationHelper({ message: 'wrong username or password', type: 'error' })
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    try {
      console.log('clicked logout')
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      setNotificationHelper({ message: 'logged out successfully', type: 'success' })
    } catch {
      console.log('error in logging out')
    }
  }

  const handleCreateBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setNotificationHelper({ message: `a new blog ${newBlog.title} by ${newBlog.author} added`, type: 'success' })
    } catch (error) {
      console.error('Error creating blog:', error)
      setNotificationHelper({ message: 'Error creating blog', type: 'error' })
    }
  }

  const handleLike = async (blog) => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    try {
      const response = await blogService.update(blog.id, updatedBlog)
      setBlogs(blogs.map(b => b.id === blog.id ? response : b))
    } catch (error) {
      console.log(error)
      console.error('Error in liking blog')
    }
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      setNotificationHelper({ message: 'Successfully deleted blog', type: 'success' })
    }
  }

  if (user === null) {
    return (
      <>
        <Notification message={notification.message} type={notification.type}/>
        <LoginForm
          handleSubmit={handleLogin}
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
      <div style={{ display: 'flex' }}>
        <div>{user.name} logged in</div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <AddBlogForm
          createBlog={handleCreateBlog}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} onLike={handleLike} onRemove={handleRemove} user={user.username}/>
      )}
    </div>
  )
}

export default App