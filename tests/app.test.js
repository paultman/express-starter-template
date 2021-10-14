const request = require('supertest');
const config = require('../server.config');
const logger = require('../lib/logger');

const app = require('../app')(config, logger);

describe('get /task', () => {
  describe('get task of id 1', () => {
    // should get back task of id 1
    test('should respond with task for id 1 in JSON format', async () => {
      const response = await request(app).get('/task/1');
      // expect(response.statusCode).toBe(200);
      expect(response.body.state).toBe('open');
    });

    test('should respond with an error when requesting an invalid task', async () => {
      const response = await request(app).get('/task/-1');
      expect(response.statusCode).toBe(500);
    });
  });
});
