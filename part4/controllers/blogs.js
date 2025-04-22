const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('', async (request, response) => {
    const blogs = await Blog.find({})
    return response.json(blogs)
})

blogsRouter.post('', async (request, response) => {
    const { title, url } = request.body

    if (!title || !url) {
        return response.status(400).json({ error: 'title and url are required' })
    }

    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (error) {
        response.status(400).json({ error: 'malformatted id' })
    }
})

module.exports = blogsRouter
