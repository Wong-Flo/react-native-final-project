import type { User } from '../migrations/00001-createTableUsers';
import type { Session } from '../migrations/00002-createTableSessions';
import { sql } from './connect';

export async function createSessionInsecure(token: string, userId: User['id']) {
  const [session] = await sql<Session[]>`
    INSERT INTO sessions (token, user_id)
    VALUES (${token}, ${userId})
    RETURNING id, token, user_id
  `;
  await sql`DELETE FROM sessions WHERE expiry_timestamp < now()`;
  return session;
}

export async function getValidSession(sessionToken: string) {
  const [session] = await sql<Session[]>`
    SELECT id, token, user_id
    FROM sessions
    WHERE token = ${sessionToken} AND expiry_timestamp > now()
  `;
  return session;
}

export async function deleteSession(sessionToken: string) {
  const [session] = await sql<Session[]>`
    DELETE FROM sessions
    WHERE token = ${sessionToken}
    RETURNING id, token
  `;
  return session;
}
