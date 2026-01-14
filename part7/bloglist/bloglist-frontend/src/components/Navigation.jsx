import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

const Navigation = ({ user, handleLogout }) => {
  const style = {
    backgroundColor: "lightgray",
    padding: 3,
  }
  return (
    <div style={style}>
      <Link style={style} to='/'>blogs</Link>
      <Link style={style} to='/users'>users</Link>
      {user.name} logged in
      <button style={{ marginLeft: 5 }} onClick={handleLogout}>logout</button>
    </div>
    
  )
}

export default Navigation