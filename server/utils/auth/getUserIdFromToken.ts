import jwt from 'jsonwebtoken';

export const getUserIdFromToken = (event: any) => {
  const authHeader = getHeader(event, 'authorization');
  const token = authHeader?.split(' ')[1];
  const secret = process.env.JWT_SECRET;

  if (!token || !secret) {
    throw new Error('No token or secret');
  }

  const decoded = jwt.verify(token, secret) as { id: number };

  return decoded.id;
};
