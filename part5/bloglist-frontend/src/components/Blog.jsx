import { useState } from "react"
const Blog = ({ blog, onLike, onRemove, user }) => {
  const [visible, setVisible] = useState(false)
  
  const toggleVisibility = () => { 
    setVisible(!visible)
  }

  const isCreator = () => {
    console.log()
  }
  

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!visible) {
    return (
      <div style={blogStyle}>
        <div style={{display: 'flex'}}>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>view</button>
        </div>
      </div>  
    )
  } else {
    return (
      <div style={blogStyle}>
        <div style={{display: 'flex'}}>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>{blog.url}</div>
        <div style={{display: 'flex'}}>
          {blog.likes}
          <button onClick={() => onLike(blog)}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {user === blog.user.username &&
          <button onClick={() => onRemove(blog)}>remove</button>
        }
      </div>
    )
  }
}

export default Blog