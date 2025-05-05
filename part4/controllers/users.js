const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('', async (request, response, next) => {
    try {
        const { username, password, name } = request.body

        if (!username || !password || !name) {
            return response.status(400).json({ error: 'username, password and name are required' })
        }

        if (password.length < 3) {
            return response.status(400).json({ error: 'password length must be at least 3 characters' })
        }

        if (username.length < 3) {
            return response.status(400).json({ error: 'username length must be at least 3 characters' })
        }

        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return response.status(400).json({ error: 'username must be unique' })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username,
            name,
            passwordHash,
        })

        const savedUser = await user.save()
        response.status(201).json(savedUser)

    } catch (error) {
        next(error)
    }
})

module.exports = usersRouter
