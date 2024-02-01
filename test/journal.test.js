const request = require('supertest')
const { MongoMemoryServer } = require ('mongodb-memory-server')
const app = require('../app')
const User = require('../models/user') 
const mongoose = require('mongoose')
const server = app.listen(8081, () => console.log('Testing on Port 8081'))

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
    test('It should display a list of all journals', async () => {
        const user = new User({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
        await user.save()
        const token = await user.generateAuthToken()

        const response = await request(app)
            .get('/journals')
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('journals')
    })
    test('It should display a single journal with a valid id', async () => {
        const user = new User({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
        await user.save()
        const token = await user.generateAuthToken()

        const journal = await request(app)
            .post('/journals')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Hawaii Trip', location: 'Hawaii', summary: 'I went to Hawaii and it was awesome', date_visited: '01-01-21' })

        const response = await request(app)
            .get(`/journals/${journal.body._id}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual('Hawaii Trip')
        expect(response.body.location).toEqual('Hawaii')
        expect(response.body.summary).toEqual('I went to Hawaii and it was awesome')
        expect(response.body.date_visited).toEqual('01-01-21')
    })
    test('It should update a journal with a valid id', async () => {
        const user = new User({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
        await user.save()
        const token = await user.generateAuthToken()

        const journal = await request(app)
            .post('/journals')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Hawaii Trip', location: 'Hawaii', summary: 'I went to Hawaii and it was awesome', date_visited: '01-01-21' })

        const response = await request(app)
            .put(`/journals/${journal.body._id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Hawaii Trip', location: 'Hawaii', summary: 'I went to Hawaii and it was alright I guess', date_visited: '01-01-21' })

        expect(response.statusCode).toBe(200)
        expect(response.body.title).toEqual('Hawaii Trip')
        expect(response.body.location).toEqual('Hawaii')
        expect(response.body.summary).toEqual('I went to Hawaii and it was alright I guess')
        expect(response.body.date_visited).toEqual('01-01-21')
  })
    test('It should delete a journal with a valid id', async () => {
        const user = new User({ name: 'John Doe', email: 'john.doe@example.com', password: 'password123' })
        await user.save()
        const token = await user.generateAuthToken()

        const journal = await request(app)
            .post('/journals')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Hawaii Trip', location: 'Hawaii', summary: 'I went to Hawaii and it was awesome', date_visited: '01-01-21' })

        const response = await request(app)
            .delete(`/journals/${journal.body._id}`)
            .set('Authorization', `Bearer ${token}`)

        expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual('Journal has been abolished')
})
})