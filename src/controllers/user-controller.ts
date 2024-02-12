import { IncomingMessage, ServerResponse } from 'http';
import { createNewUser, getAllUsers, getUserById } from '../models/user-model';
import { INVALID_USER_ID, INVALID_USER_INPUT, SERVER_ERROR, URL_NOT_FOUND, USER_NOT_FOUND } from '../utils/constants';
import { validateId, validateUserInput } from '../utils/helpers';

export const getUsers = (req: IncomingMessage, res: ServerResponse) =>
  handleServerError(req, res, () => {
    const users = getAllUsers();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  });

export const getUser = (req: IncomingMessage, res: ServerResponse, id: string) =>
  handleServerError(req, res, () => {
    const isValidId = validateId(id);

    if (!isValidId) {
      invalidUserIdError(req, res);

      return;
    }

    const user = getUserById(id);

    if (!user) {
      userNotFoundError(req, res);

      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  });

export const createUser = (req: IncomingMessage, res: ServerResponse) =>
  handleServerError(req, res, () => {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk.toString();
    });

    req.on('end', () => {
      const userData = JSON.parse(data);
      const isValidUserInput = validateUserInput(userData);

      if (!isValidUserInput) {
        invalidUserInput(req, res);

        return;
      }

      const { username, age, hobbies } = userData;
      const newUser = createNewUser({ username, age, hobbies });

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    });
  });

export const userNotFoundError = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: USER_NOT_FOUND }));
};

export const invalidUserIdError = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: INVALID_USER_ID }));
};

export const invalidUserInput = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: INVALID_USER_INPUT }));
};

export const invalidUrlError = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: URL_NOT_FOUND }));
};

export const serverError = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: SERVER_ERROR }));
};

export const handleServerError = (req: IncomingMessage, res: ServerResponse, func: () => void) => {
  try {
    func();
  } catch (error) {
    console.log('Server error:', error);
    serverError(req, res);
  }
};
