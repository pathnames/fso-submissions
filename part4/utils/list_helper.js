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


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog, 
    mostBlogs
}