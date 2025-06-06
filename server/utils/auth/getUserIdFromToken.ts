import jwt from 'jsonwebtoken';

export const getUserIdFromToken = (event: any) => {
  const authHeader = getHeader(event, 'authorization');
  console.log('🔑 Header:', authHeader);
  const token = authHeader?.split(' ')[1];
  console.log('🔑 Token:', token);
  const secret = process.env.JWT_SECRET;
  console.log('🔑 JWT_SECRET:', secret);

  if (!token || !secret) {
    throw new Error('No token or secret');
  }
  // const decoded = jwt.decode(token) as { id: number };
  const decoded = jwt.verify(token, secret) as { id: number };
  console.log('✅ Decoded:', decoded);

  return decoded.id;
};
