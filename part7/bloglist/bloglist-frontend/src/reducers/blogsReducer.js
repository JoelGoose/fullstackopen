import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";


const initialState = [];

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    getBlogs(state, action) {
      return action.payload;
    },
    createBlog(state, action) {
      state.push(action.payload);
    },
    voteBlog(state, action) {
      const id = action.payload.id;
      const index = state.findIndex((blog) => blog.id === id);
      state[index] = action.payload;
    },
    removeBlog(state, action) {
      const id = action.payload.id;
      const index = state.findIndex((blog) => blog.id === id);
      state.splice(index, 1);
    },
    addComment(state, action) {
      const id = action.payload.id;
      const index = state.findIndex((blog) => blog.id === id);
      state[index] = action.payload;
    }
  },
});

export const { getBlogs, createBlog, voteBlog, removeBlog, addComment } =
  blogsSlice.actions;

export const commentBlog = (id, content) => {
  return async dispatch => {
    const newBlog = await blogService.createComment(id, { comment: content })
    dispatch(addComment(newBlog))
  }
}

export default blogsSlice.reducer;
