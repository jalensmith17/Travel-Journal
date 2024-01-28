const request = require('supertest')
const { MongoMemoryServer } = require ('mongodb-memory-server')
const app = require('../app')
const User = require('../models/user') 
const mongoose = require('mongoose')
const server = app.listen(8080, () => console.log('Testing on Port 8080'))

let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
})

afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

describe('Test the users endpoints', () => {
    test('It should create a new user', async () => {
      const response = await request(app)
        .post('/users')
        .send({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
      
      expect(response.statusCode).toBe(200)
      expect(response.body.user.name).toEqual('John Doe')
      expect(response.body.user.email).toEqual('john.doe@example.com')
      expect(response.body).toHaveProperty('token')
    })
  
    test('It should login a user', async () => {
      const user = new User({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
      await user.save()
  
      const response = await request(app)
        .post('/users/login')
        .send({ email: 'john.doe@example.com', password: 'password123' })
      
      expect(response.statusCode).toBe(200)
      expect(response.body.user.name).toEqual('John Doe')
      expect(response.body.user.email).toEqual('john.doe@example.com')
      expect(response.body).toHaveProperty('token')
    })
  
    test('It should update a user', async () => {
      const user = new User({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
      await user.save()
      const token = await user.generateAuthToken()
  
      const response = await request(app)
        .put(`/users/${user._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Jane Doe', email: 'jane.doe@example.com' })
      
      expect(response.statusCode).toBe(200)
      expect(response.body.name).toEqual('Jane Doe')
      expect(response.body.email).toEqual('jane.doe@example.com')
    })
  
    test('It should delete a user', async () => {
      const user = new User({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
      await user.save()
      const token = await user.generateAuthToken()
  
      const response = await request(app)
        .delete(`/users/${user._id}`)
        .set('Authorization', `Bearer ${token}`)
      
      expect(response.statusCode).toBe(200)
      expect(response.body.message).toEqual('User deleted')
    })
  })

  //journal endpoints

  describe('Test the journal endpoints', () => {
    test('It should create a new journal', async () => {
        const user = new User({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
        await user.save()
        const token = await user.generateAuthToken()

        const response = await request(app)
            .post('/journals')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Hawaii Trip', location: 'Hawaii', summary: 'I went to Hawaii and it was awesome', date_visited: '01-01-21' })

        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual('Hawaii Trip')
        expect(response.body.location).toEqual('Hawaii')
        expect(response.body.summary).toEqual('I went to Hawaii and it was awesome')
        expect(response.body.date_visited).toEqual('01-01-21')
    })
  })