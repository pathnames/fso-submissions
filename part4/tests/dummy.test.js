const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })


    test('totalLikes calculates the correct number of likes for multiple blogs', () => {
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 36)
    })
})

describe('favoriteBlog returns the blog with most likes', () => {
    const expectedResult = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    }
    assert.strictEqual(expectedResult.likes, listHelper.favoriteBlog(blogs).likes)

    test('mostBlogs returns the author with the most blog posts', () => {
        const blogs = [
            {
                title: "Post A",
                author: "Alice",
                url: "http://example.com/a",
                likes: 5
            },
            {
                title: "Post B",
                author: "Bob",
                url: "http://example.com/b",
                likes: 3
            },
            {
                title: "Post C",
                author: "Alice",
                url: "http://example.com/c",
                likes: 7
            },
            {
                title: "Post D",
                author: "Bob",
                url: "http://example.com/d",
                likes: 2
            },
            {
                title: "Post E",
                author: "Alice",
                url: "http://example.com/e",
                likes: 10
            }
        ]

        const result = listHelper.mostBlogs(blogs)
        const expected = {
            author: "Alice",
            blogs: 3
        }

        assert.deepStrictEqual(result, expected)
    })


    test('mostLikes returns the author with highest total likes', () => {
        const blogs = [
            {
                title: "Post A",
                author: "Alice",
                likes: 5
            },
            {
                title: "Post B",
                author: "Bob",
                likes: 3
            },
            {
                title: "Post C",
                author: "Alice",
                likes: 7
            },
            {
                title: "Post D",
                author: "Bob",
                likes: 2
            },
            {
                title: "Post E",
                author: "Alice",
                likes: 10
            }
        ]

        const result = listHelper.mostLikes(blogs)
        const expected = {
            author: "Alice",
            likes: 22
        }

        assert.deepStrictEqual(result, expected)
    })
})