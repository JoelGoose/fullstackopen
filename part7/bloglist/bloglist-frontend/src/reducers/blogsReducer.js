import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const { getBlogs, createBlog, voteBlog, removeBlog } =
  blogsSlice.actions;
export default blogsSlice.reducer;
