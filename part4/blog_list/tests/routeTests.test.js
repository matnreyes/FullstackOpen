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

test('verify name of blog unique identifier', async () => {
  const newBlog = {
    title: 'Pizza is a great snack (Part 2)',
    author: 'John Walker',
    url: 'pizzahut.com',
    likes: 200
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.id).toBeDefined()
})

test('check that new blog is added to database', async () => {
  const newBlog = {
    title: 'Pizza is a great snack (Part 3)',
    author: 'Anothony Hopkins',
    url: 'digiornos.com',
    likes: 300
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const allBlogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(allBlogs.body.length).toEqual(initialBlogs.length + 1)
})


describe('field is missing', () => {
  test('missing likes property defaults to 0', async () => {
    const newBlog = {
      title: 'Pizza is a horrible snack',
      author: 'Paul Newman',
      url: 'fakeblog.com'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toEqual(0)
  })

  test('missing title and url', async () => {
    const newBlog = {
      author: 'Johnny Bravo',
      likes: 3
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.status).toEqual(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})