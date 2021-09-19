const app = require('../server');
const supertest = require('supertest');

test('should GET /', async () => {
    const data = { message: "Home"}

    await supertest(app).get("/")
        .expect(200)
        .then((response) => {
            // Check data
            expect(response.status).toBe(200)
            expect(response.body.message).toBe(data.message)
        })
})

test('should POST /message', async () => {
    const data = { message: 'this is a post'}

    const response = await supertest(app)
        .post("/message")
        .send(data)

    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    expect(response.body.message).toBe('Received')
})