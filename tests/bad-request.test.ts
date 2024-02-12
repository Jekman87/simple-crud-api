import request from 'supertest';
import { server } from '../src/index';
import { INVALID_USER_ID, INVALID_USER_INPUT, USER_NOT_FOUND } from '../src/utils/constants';

describe('Error 400 Tests', () => {
  afterAll(() => {
    server.close();
  });

  it('GET api/users/{userId} should return 400 if userId is invalid', async () => {
    const invalidUserId = 'invalid-user-id';
    const response = await request(server).get(`/api/users/${invalidUserId}`);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ message: INVALID_USER_ID });
  });

  it('POST api/users should return 400 if required fields are missing', async () => {
    const userData = {
      age: 25,
      hobbies: ['reading', 'coding'],
    };
    const response = await request(server).post('/api/users').send(userData);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ message: INVALID_USER_INPUT });
  });

  it('PUT api/users/{userId} should return 400 if userId is invalid', async () => {
    const invalidUserId = 'invalid-user-id';
    const response = await request(server).put(`/api/users/${invalidUserId}`).send({});
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ message: INVALID_USER_ID });
  });

  it('PUT api/users/{userId} should return 400 if required fields are missing', async () => {
    const userData = {
      age: 125,
      hobbies: ['reading', 'coding'],
    };
    const response = await request(server).post('/api/users/6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b').send(userData);
    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ message: INVALID_USER_INPUT });
  });
});
