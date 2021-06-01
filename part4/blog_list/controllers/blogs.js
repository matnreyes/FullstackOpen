const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(400).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!request.token || !request.user.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(request.user.id)

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  console.log('foo')
  const blog = await Blog.findById(request.params.id)
  if (!request.user || (blog.user.toString() !== request.user.id)) {
    response.status(401).json({ error: 'user does not have permission to delete the note' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedInfo = request.body
  const blog = {
    likes: updatedInfo.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter