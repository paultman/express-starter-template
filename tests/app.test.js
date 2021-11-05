// app.test.js
const request = require('supertest');
const { MongoClient } = require('mongodb');
const config = require('../server.config');
const logger = require('../lib/logger');

const app = require('../app');

let connection;
let db;

beforeAll(async () => {
  connection = await MongoClient.connect(global.__MONGO_URI__, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = await connection.db();
  app.init(config, logger, db);
});

afterAll(async () => {
  await connection.close();
});

describe('POST /task', () => {
  test('should create a new task', async () => {
    const response = await request(app).post('/task').send({ _id: 1, desr: 'task One', state: 'open' });
    expect(response.statusCode).toBe(200);
  });

  test('should respond with task for id 1 in JSON format', async () => {
    const response = await request(app).get('/task/1');
    expect(response.body.state).toBe('open');
  });

  test('should respond with an updated record after changing a field', async () => {
    const response = await request(app).post('/task/1').send({ state: 'done' });
    expect(response.body.modifiedCount).toBe(1);
  });

  test('should respond with an a message of 1 record  deleted', async () => {
    const response = await request(app).delete('/task/1');
    expect(response.body.result).toBe('1 deleted');
  });

  test('should respond with an empty record when requesting an invalid task', async () => {
    const response = await request(app).get('/task/1');
    expect(response.body).toStrictEqual({});
  });
});
