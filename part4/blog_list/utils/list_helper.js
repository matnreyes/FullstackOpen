const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  const result = blogs.reduce((sum, blog) => blog.likes + sum, 0)
  return result
}

module.exports = {
  dummy,
  totalLikes
}