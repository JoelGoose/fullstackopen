const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs in database are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, 3)
})

test('blog identifiers is named "id"', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]

  assert.strictEqual(blog._id, undefined)
  assert.notStrictEqual(blog.id, undefined)
})

test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'Welcome to my new blog!',
      author: 'Awesomesauce1',
      url: 'https://dictionary.cambridge.org/dictionary/english/awesomesauce',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    assert.strictEqual(response.body.length, initialBlogs.length + 1)
    assert(titles.includes('Welcome to my new blog!'))
})

test('If likes field is missing, it defaults to 0', async () => {
    const newBlog = {
      title: 'Welcome to my new blog!',
      author: 'Awesomesauce1',
      url: 'https://dictionary.cambridge.org/dictionary/english/awesomesauce',
      // likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const postedBlog = response.body[response.body.length-1]
    assert.notStrictEqual(postedBlog.likes, undefined)
    assert.strictEqual(postedBlog.likes, 0)
})

test('an invalid blog gets the Bad Request status code', async () => {
    const newBlog = {
      author: 'Awesomesauce1',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
})

test('deleting a blog is reflected in the database', async () => {
  const response = await api.get('/api/blogs')
  const blogToDelete = response.body[0]
  
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  // new get request to confirm blog got deleted
  const newResponse = await api.get('/api/blogs')
  const ids = newResponse.body.map(blog => blog.id)

  assert.strictEqual(newResponse.body.length, initialBlogs.length - 1)
  assert.strictEqual(ids.includes(`${blogToDelete.id}`), false)
})

test('updating likes is reflected in the database', async () => {
    const newBlogs = {
        likes: 100
    }
    
    const response = await api.get('/api/blogs')
    const blogToUpdate = response.body[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlogs)
      .expect(200)

    const newResponse = await api.get('/api/blogs')
    const blog = newResponse.body[0]
    assert.strictEqual(blog.likes, 100)
})

after(async () => {
  await mongoose.connection.close()
})