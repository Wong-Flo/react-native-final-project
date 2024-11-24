import crypto from 'node:crypto';
import bcryptJs from 'bcryptjs';
import { createSessionInsecure } from '../../../database/sessions';
import { createUserInsecure, getUserInsecure } from '../../../database/users';
import { ExpoApiResponse } from '../../../ExpoApiResponse';
import { userSchema } from '../../../migrations/00001-createTableUsers';
import { createSerializedRegisterSessionTokenCookie } from '../../../util/cookies';

export type RegisterResponseBodyPost =
  | { user: { username: string } }
  | { error: string; errorIssues?: { message: string }[] };

export async function POST(
  request: Request,
): Promise<ExpoApiResponse<RegisterResponseBodyPost>> {
  // 1. Get user data from the request body
  const requestBody = await request.json();

  // 2. Validate the user data with zod schema
  const result = userSchema.safeParse(requestBody);

  if (!result.success) {
    return ExpoApiResponse.json(
      {
        error: 'Invalid user data',
        errorIssues: result.error.issues,
      },
      { status: 400 },
    );
  }

  // 3. Check if the username already exists in the database
  const existingUser = await getUserInsecure(result.data.username);
  if (existingUser) {
    return ExpoApiResponse.json(
      { error: 'Username already taken :)' },
      { status: 400 },
    );
  }

  // 4. Hash the password using bcryptjs
  const passwordHash = await bcryptJs.hash(result.data.password, 12);

  // 5. Create a new user in the database
  const newUser = await createUserInsecure(result.data.username, passwordHash);
  if (!newUser) {
    return ExpoApiResponse.json(
      { error: 'Registration failed due to an unknown error' },
      { status: 500 },
    );
  }

  // 6. Generate a session token using crypto
  const token = crypto.randomBytes(100).toString('base64');

  // 7. Create a session for the new user
  const session = await createSessionInsecure(token, newUser.id);
  if (!session) {
    return ExpoApiResponse.json(
      { error: 'Session creation failed' },
      { status: 500 },
    );
  }

  // 8. Serialize the session token and set it in a cookie
  const serializedCookie = createSerializedRegisterSessionTokenCookie(
    session.token,
  );

  // 9. Return the user data with the cookie in the response
  return ExpoApiResponse.json(
    { user: { username: newUser.username } },
    { headers: { 'Set-Cookie': serializedCookie } },
  );
}
