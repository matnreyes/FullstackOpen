const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const initialBlogs = [
  {
    title: 'The Jungle Book',
    author: 'John C. Reilly',
    url: 'google.com',
    likes: 300
  },
  {
    title: 'The Lorax',
    author: 'Tom Sawyer',
    url: 'facebook.com',
    likes: 400
  },
  {
    title: 'Peopel',
    author: 'John Stewart',
    url: 'netflix.com',
    likes: 3
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('fetch all the blogs in db', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogs = response.body.map(blog => blog)
  expect(blogs.length).toEqual(initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})