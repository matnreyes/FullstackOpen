const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)

describe('add user to database', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('user fits all criteria', async () => {
    const newUser = {
      username: 'test1',
      name: 'Root Access 1',
      password: 'testscenario'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('username is missing', async () => {
    const newUser = {
      name: 'Johnny Bravo',
      password: 'Bazinga'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toBe('field is missing')
  })

  test('password doesnt match required length', async () => {
    const newUser = {
      username: 'eddedneddy',
      password: 'ca',
      name: 'Edd'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toBe('password must be at least 3 characters')
  })
})