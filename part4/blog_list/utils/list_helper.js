const lodash = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  const result = blogs.reduce((sum, blog) => blog.likes + sum, 0)
  return result
}

const favoriteBlog = (blogs) => {
  const blog = blogs.find(blog => blog.likes === Math.max(...blogs.map(blog => blog.likes)))
  return blog.title
}

const mostBlogs = (blogs) => {
  const numBlogs = lodash.groupBy(blogs, 'author')
  const authors = lodash.keysIn(numBlogs)
  const mostWrittenNum =  Math.max(...authors.map(author => numBlogs[author].length))
  const result = {
    author: authors.find(author => numBlogs[author].length === mostWrittenNum),
    blogs: mostWrittenNum
  }
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}