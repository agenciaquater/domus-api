import crypto from 'node:crypto';

export const generateRandomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString('hex');