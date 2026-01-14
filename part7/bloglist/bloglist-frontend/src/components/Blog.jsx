import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";
import storage from "../services/storage";

const Blog = ({ handleVote, handleDelete }) => {
  
  const blogs = useSelector((state) => state.blogs)

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  if (!blog) {
    return null
  }
  
  const nameOfUser = blog.user ? blog.user.name : "anonymous";

  const style = {
    padding: 10,
    marginBottom: 5,
  };

  const canRemove = blog.user ? blog.user.username === storage.me() : true;

  console.log(blog.user, storage.me(), canRemove);

  return (
    <div style={style} className="blog">
      <h2>{blog.title} by {blog.author}</h2>
        <div>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            likes {blog.likes}
            <button style={{ marginLeft: 3 }} onClick={() => handleVote(blog)}>
              like
            </button>
          </div>
          <div>added by {nameOfUser}</div>
          {canRemove && (
            <button onClick={() => handleDelete(blog)}>remove</button>
          )}
          <h3>comments</h3>
        </div>
    </div>
  );
};

Blog.propTypes = {
  handleVote: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Blog;
