const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: 'Title or url is missing'
    })
  }

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user._id
  })


  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    response.status(404).json({ error: "blog not found" })
  }
  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response.status(403).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes} = request.body 
  const blogToUpdate = await Blog.findById(request.params.id)
  if (!blogToUpdate) {
    return response.status(404).end()
  }
  
  if (title != undefined) blogToUpdate.title = title
  if (author != undefined) blogToUpdate.author = author
  if (url != undefined) blogToUpdate.url = url
  if (likes != undefined) blogToUpdate.likes = likes
  
  const savedBlogToUpdate = await blogToUpdate.save()
  response.json(savedBlogToUpdate)
})

module.exports = blogsRouter