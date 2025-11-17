const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

describe('users', () => {
  test('with invalid inputs do not get added to the database', async () => {
    const newUserNoUsername = {
      name: "Person",
      password: "password1"
    }

    const newUserNoPassword = {
      username: "Persona",
			name: "Person"
    }

    const newUserShortPassword = {
      username: "Persona",
			name: "Person",
      password: "pw"
    }

		const resNoUsername = await api
			.post('/api/users')
			.send(newUserNoUsername)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const resNoPassword = await api
			.post('/api/users')
			.send(newUserNoPassword)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const resShortPassword = await api
			.post('/api/users')
			.send(newUserShortPassword)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await User.find({})
		assert.strictEqual(usersAtEnd.length, 0)
		assert.strictEqual(resNoPassword.body.error, "username or password missing")
		assert.strictEqual(resNoUsername.body.error, "username or password missing")
		assert.strictEqual(resShortPassword.body.error, "password should be at least 3 characters long")
  })
})

after(async () => {
  await mongoose.connection.close()
})