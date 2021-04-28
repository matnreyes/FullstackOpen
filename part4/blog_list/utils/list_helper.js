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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}