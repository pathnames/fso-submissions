const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    const newUser = User({
        username: 'test_user@gmail.com',
        password: 'test',
        name: 'dummy'
    })
    newUser.save()
})

after(async () => {
    await mongoose.connection.close()
})

describe('User tests for chapter 4', () => {
    test('username must be > 3 characters', async () => {
        const testUser = {
            username: 'bb', // Too short
            password: 'bob123',
            name: 'bob'
        }

        const result = await api
            .post('/api/users')
            .send(testUser)
            .expect(400)

        assert.strictEqual(result.body.error, 'username length must be at least 3 characters')
    })

    test('password must be > 3 characters', async () => {
        const testUser = {
            username: 'bb', // Too short
            password: 'bo',
            name: 'bob'
        }

        const result = await api
            .post('/api/users')
            .send(testUser)
            .expect(400)

        assert.strictEqual(result.body.error, 'password length must be at least 3 characters')
    })

    test('usernames must be unique', async () => {
        const newUser = {
            username: 'test_user@gmail.com',
            password: 'test',
            name: 'dummy'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        assert.strictEqual(result.body.error, 'username must be unique')
    })
})
