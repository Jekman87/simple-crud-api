import request from 'supertest';
import { server } from '../src/index';
import { URL_NOT_FOUND, USER_NOT_FOUND } from '../src/utils/constants';

describe('Error 404 Tests', () => {
  const uuid = '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b';

  afterAll(() => {
    server.close();
  });

  it('GET api/users/{userId} should return 404 if user does not exist', async () => {
    const response = await request(server).get(`/api/users/${uuid}`);
    expect(response.status).toEqual(404);
    expect(response.body).toEqual({ message: USER_NOT_FOUND });
  });

  it('PUT api/users/{userId} should return 404 if user does not exist', async () => {
    const response = await request(server).put(`/api/users/${uuid}`).send({});
    expect(response.status).toEqual(404);
    expect(response.body).toEqual({ message: USER_NOT_FOUND });
  });

  it('DELETE api/users/{userId} should return 404 if user does not exist', async () => {
    const response = await request(server).delete(`/api/users/${uuid}`);
    expect(response.status).toEqual(404);
    expect(response.body).toEqual({ message: USER_NOT_FOUND });
  });

  it('Requests to non-existing endpoints should return 404 and corresponding message', async () => {
    const response = await request(server).get('/bla-bla/non-existing-endpoint');
    expect(response.status).toEqual(404);
    expect(response.body).toEqual({ message: URL_NOT_FOUND });
  });
});
