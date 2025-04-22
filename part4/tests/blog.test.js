const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blog = new Blog({
        title: 'Test Blog',
        author: 'Tester',
        url: 'http://example.com',
        likes: 5
    })

    await blog.save()
})
test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('unique identifier is named id', async () => {
    const blogs = await api.get('/api/blogs')

    blogs.body.forEach(blog => {
        assert.ok(blog.id) // id should be defined
        assert.strictEqual(blog._id, undefined) // _id should not be present
    })
})


after(async () => {
    await mongoose.connection.close()
})