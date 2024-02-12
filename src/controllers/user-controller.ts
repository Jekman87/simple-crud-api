import { IncomingMessage, ServerResponse } from 'http';
import { getAllUsers, getUserById } from '../models/user-model';
import { INVALID_USER_ID, USER_NOT_FOUND } from '../utils/constants';
import { validateId } from '../utils/helpers';

export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  const users = getAllUsers();

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
};

export const getUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
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
};

export const userNotFoundError = async (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: USER_NOT_FOUND }));
};

export const invalidUserIdError = async (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: INVALID_USER_ID }));
};
