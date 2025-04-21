const dummy = (blogs) => {
    return 1
}

const totalLikes = blogs => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, blog) => {
        return blog.likes > max.likes ? blog : max;
    })
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null

    const authorCount = {}

    blogs.forEach(blog => {
        authorCount[blog.author] = (authorCount[blog.author] || 0) + 1
    })

    let maxBlogs = 0
    let topAuthor = ''

    for (const author in authorCount) {
        if (authorCount[author] > maxBlogs) {
            maxBlogs = authorCount[author]
            topAuthor = author
        }
    }

    return {
        author: topAuthor,
        blogs: maxBlogs
    }
}

const mostLikes = (blogs) => {
    const likesMap = {}

    blogs.forEach(blog => {
        likesMap[blog.author] = (likesMap[blog.author] || 0) + blog.likes
    })

    let topAuthor = null
    let maxLikes = 0

    for (const author in likesMap) {
        if (likesMap[author] > maxLikes) {
            topAuthor = author
            maxLikes = likesMap[author]
        }
    }

    return topAuthor ? { author: topAuthor, likes: maxLikes } : null
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}