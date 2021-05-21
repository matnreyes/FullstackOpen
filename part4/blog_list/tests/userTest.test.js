const mongoose = require('mongoose')
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
})