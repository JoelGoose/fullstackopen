const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!blog.title || !blog.url) {
    return response.status(400).json({
      error: 'Title or url is missing'
    })
  }
  
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes} = request.body 
  const blogToUpdate = await Blog.findById(request.params.id)
  if (!blogToUpdate) {
    return response.status(404).end
  }
  
  if (title != undefined) blogToUpdate.title = title
  if (author != undefined) blogToUpdate.author = author
  if (url != undefined) blogToUpdate.url = url
  if (likes != undefined) blogToUpdate.likes = likes
  
  const savedBlogToUpdate = await blogToUpdate.save()
  response.json(savedBlogToUpdate)
})

module.exports = blogsRouter