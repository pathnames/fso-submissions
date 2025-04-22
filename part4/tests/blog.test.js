const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

let blogToDelete

beforeEach(async () => {
    await Blog.deleteMany({})

    const blog = new Blog({
        title: 'Blog to be deleted',
        author: 'Test Author',
        url: 'http://example.com',
        likes: 5
    })

    blogToDelete = await blog.save()
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

test('if likes property is missing from request, it defaults to 0', async () => {
    const newBlog = {
        title: 'Blog with no likes',
        author: 'No Likes Author',
        url: 'http://nolikes.com'
    }

    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
})

test('fails with status 400 if title is missing', async () => {
    const newBlog = {
        author: 'Author',
        url: 'http://missingtitle.com',
        likes: 3
    }

    const result = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    assert.strictEqual(result.status, 400)
})

test('fails with status 400 if url is missing', async () => {
    const newBlog = {
        title: 'Missing URL',
        author: 'Author',
        likes: 3
    }

    const result = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    assert.strictEqual(result.status, 400)
})

test('deletes a blog successfully', async () => {
    await api
        .delete(`/api/blogs/${blogToDelete._id}`)
        .expect(204)

    const blogsAfter = await Blog.find({})
    assert.strictEqual(blogsAfter.length, 0)
})

after(async () => {
    await mongoose.connection.close()
})