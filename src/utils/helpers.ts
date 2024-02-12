import { validate, version } from 'uuid';

export const validateId = (uuid: string): boolean => validate(uuid) && version(uuid) === 4;
