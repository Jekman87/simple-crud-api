import * as dotenv from 'dotenv';
import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  invalidUrlError,
  serverError,
  updateUser,
} from './controllers/user-controller';
import { BASE_URL } from './utils/constants';

dotenv.config();

export const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  try {
    const { url = '', method = '' } = req;
    const slugs = url.slice(1).split('/') || [];

    if (!(BASE_URL === `/${slugs[0]}/${slugs[1]}`) || slugs.length > 3) {
      invalidUrlError(req, res);

      return;
    }

    const userId = slugs[2];

    switch (method) {
      case 'GET':
        if (userId) {
          getUser(req, res, userId);
        } else {
          getUsers(req, res);
        }

        break;

      case 'POST':
        createUser(req, res);

        break;

      case 'PUT':
        updateUser(req, res, userId);

        break;

      case 'DELETE':
        deleteUser(req, res, userId);

        break;

      default:
        invalidUrlError(req, res);
        break;
    }
  } catch (error) {
    serverError(req, res, error);
  }
});

const port = process.env.PORT || 4000;

server.listen(port, () => console.log(`The server is running on port ${port}`));
