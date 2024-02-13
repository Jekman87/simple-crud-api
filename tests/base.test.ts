import { USER_NOT_FOUND } from '../src/utils/constants';
import { server } from '../src/index';
import request from 'supertest';

describe('Base Tests', () => {
  afterAll(() => {
    server.close();
  });

  it('GET api/users should return an empty array', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]);
  });

  it('POST api/users should create a new user', async () => {
    const userData = {
      username: 'testuser',
      age: 25,
      hobbies: ['reading', 'coding'],
    };
    const response = await request(server).post('/api/users').send(userData);
    expect(response.status).toEqual(201);
    expect(response.body).toMatchObject(userData);
  });

  it('GET api/users/:userId should return the created user', async () => {
    const userData = {
      username: 'testuser',
      age: 25,
      hobbies: ['reading', 'coding'],
    };
    const createUserResponse = await request(server).post('/api/users').send(userData);
    const userId = createUserResponse.body.id;

    const getUserResponse = await request(server).get(`/api/users/${userId}`);
    expect(getUserResponse.status).toEqual(200);
    expect(getUserResponse.body).toMatchObject(userData);
  });

  it('PUT api/users/:userId should update the created user', async () => {
    const userData = {
      username: 'testuser',
      age: 25,
      hobbies: ['reading', 'coding'],
    };
    const updatedUserData = {
      username: 'updateduser',
      age: 30,
      hobbies: ['swimming'],
    };
    const createUserResponse = await request(server).post('/api/users').send(userData);
    const userId = createUserResponse.body.id;

    const updateUserResponse = await request(server).put(`/api/users/${userId}`).send(updatedUserData);
    expect(updateUserResponse.status).toEqual(200);
    expect(updateUserResponse.body).toMatchObject(updatedUserData);
  });

  it('DELETE api/users/:userId should delete the created user', async () => {
    const userData = {
      username: 'testuser',
      age: 25,
      hobbies: ['reading', 'coding'],
    };
    const createUserResponse = await request(server).post('/api/users').send(userData);
    const userId = createUserResponse.body.id;

    const deleteUserResponse = await request(server).delete(`/api/users/${userId}`);
    expect(deleteUserResponse.status).toEqual(204);

    const getUserResponse = await request(server).get(`/api/users/${userId}`);
    expect(getUserResponse.status).toEqual(404);
    expect(getUserResponse.body).toEqual({ message: USER_NOT_FOUND });
  });
});
