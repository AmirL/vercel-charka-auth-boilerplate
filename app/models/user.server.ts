import bcrypt from '@node-rs/bcrypt';
import { invariant } from '@remix-run/router';
import { db } from '~/utils/db.server';

export type { User } from '@prisma/client';

export async function getUserById(id: number) {
  return db.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: string) {
  return db.user.findUnique({ where: { email } });
}

export async function createUser(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return user;
}

export async function deleteUserByEmail(email: string) {
  return db.user.delete({ where: { email } });
}

export async function verifyLogin(email: string, password: string) {
  const user = await db.user.findUnique({
    where: { email },
  });

  invariant(user, 'User not found');

  const isValid = await bcrypt.verify(password, user.password);
  invariant(isValid, 'Invalid password');

  return user;
}
