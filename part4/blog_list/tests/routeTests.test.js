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

// Save information for user logged in to alter DB
const user = {
  username: 'root',
  password: 'admin'
}
let sessionUser

beforeEach(async () => {
  await Blog.deleteMany({})

  await api
    .post('/api/users')
    .send(user)

  sessionUser = await api
    .post('/api/login')
    .send(user)
  sessionUser = sessionUser.body.token

  const blogObjects = initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('fetch all the blogs in db', async () => {
  const response = await api
    .get('/api/blogs')
    .set('authorization', `bearer ${sessionUser}`)
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
    .set('authorization', `bearer ${sessionUser}`)
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
    .post('/api/blogs').set('authorization', `bearer ${sessionUser}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const allBlogs = await api
    .get('/api/blogs')
    .set('authorization', `bearer ${sessionUser}`)
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
      .set('authorization', `bearer ${sessionUser}`)
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
      .set('authorization', `bearer ${sessionUser}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.status).toEqual(400)
  })
})

test('delete a blog that was just added', async () => {
  const newBlog = {
    title: 'Super Mario Land at Universal',
    author: 'IGN',
    likes: 322,
    url: 'ign.com'
  }

  const response = await api
    .post('/api/blogs')
    .set('authorization', `bearer ${sessionUser}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  await api
    .delete(`/api/blogs/${response.body.id}`)
    .set('authorization', `bearer ${sessionUser}`)
    .expect(204)

  await api
    .get(`/api/blogs/${response.body.id}`)
    .set('authorization', `bearer ${sessionUser}`)
    .expect(400)
})

test('update likes on a blog', async () => {
  const blogs = await api
    .get('/api/blogs')
    .set('authorization', `bearer ${sessionUser}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const updatedLikes = {
    likes: 300
  }

  const update = await api
    .put(`/api/blogs/${blogs.body[0].id}`)
    .set('authorization', `bearer ${sessionUser}`)
    .send(updatedLikes)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(update.body.likes).toEqual(300)
})

test('adding blog with no auth token', async () => {
  const newBlog = {
    title: 'Monkey',
    author: 'Carlito',
    url: 'casadegatos.com',
    likes: 426
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

afterAll(() => {
  mongoose.connection.close()
})