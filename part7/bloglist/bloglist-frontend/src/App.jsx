import { useState, useEffect, createRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import {
  createBlog,
  getBlogs,
  voteBlog,
  removeBlog,
} from "./reducers/blogsReducer";
import UserContext from "../src/UserContext";

import blogService from "./services/blogs";
import loginService from "./services/login";
import storage from "./services/storage";
import Login from "./components/Login";
import Blog from "./components/Blog";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [user, userDispatch] = useContext(UserContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeBlogs = async () => {
      const blogs = await blogService.getAll();
      dispatch(getBlogs(blogs));
    };
    initializeBlogs();
  }, []);

  useEffect(() => {
    const user = storage.loadUser();
    if (user) {
      userDispatch({ type: "login", payload: user });
    }
  }, []);

  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = createRef();

  const notify = (message, type = "success") => {
    dispatch(setNotification({ message, type }));
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 5000);
  };

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      userDispatch({ type: "login", payload: user });
      storage.saveUser(user);
      notify(`Welcome back, ${user.name}`);
    } catch (error) {
      notify("Wrong credentials", "error");
    }
  };

  const handleCreate = async (blog) => {
    const newBlog = await blogService.create(blog);
    dispatch(createBlog(newBlog));
    notify(`Blog created: ${newBlog.title}, ${newBlog.author}`);
    blogFormRef.current.toggleVisibility();
  };

  const handleVote = async (blog) => {
    console.log("updating", blog);
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    });
    dispatch(voteBlog(updatedBlog));
    notify(`You liked ${updatedBlog.title} by ${updatedBlog.author}`);
  };

  const handleLogout = () => {
    userDispatch({ type: "logout" });
    storage.removeUser();
    notify(`Bye, ${user.name}!`);
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id);
      dispatch(removeBlog(blog));
      notify(`Blog ${blog.title}, by ${blog.author} removed`);
    }
  };

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <Login doLogin={handleLogin} />
      </div>
    );
  }

  const byLikes = (a, b) => b.likes - a.likes;

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog doCreate={handleCreate} />
      </Togglable>
      {blogs.toSorted(byLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleVote={handleVote}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default App;
