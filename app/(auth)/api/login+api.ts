import crypto from 'node:crypto';
import bcryptJs from 'bcryptjs';
import { createSessionInsecure } from '../../../database/sessions';
import { getUserWithPasswordHashInsecure } from '../../../database/users';
import { ExpoApiResponse } from '../../../ExpoApiResponse';
import { userSchema } from '../../../migrations/00001-createTableUsers';
import { createSerializedRegisterSessionTokenCookie } from '../../../util/cookies';

export type LoginResponseBodyPost =
  | { user: { username: string } }
  | { error: string; errorIssues?: { message: string }[] };

export async function POST(
  request: Request,
): Promise<ExpoApiResponse<LoginResponseBodyPost>> {
  // 1. Get the user data from the request body
  const requestBody = await request.json();

  // 2. Validate the data with zod
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

  // 3. Check if the user exists in the database
  const userWithPasswordHash = await getUserWithPasswordHashInsecure(
    result.data.username,
  );
  if (!userWithPasswordHash) {
    return ExpoApiResponse.json(
      { error: 'Invalid username or password' },
      { status: 401 },
    );
  }

  // 4. Validate the password by comparing with the hashed password
  const passwordMatch = await bcryptJs.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );
  if (!passwordMatch) {
    return ExpoApiResponse.json(
      { error: 'Invalid username or password' },
      { status: 401 },
    );
  }

  // 5. Generate a session token using crypto
  const token = crypto.randomBytes(100).toString('base64');

  // 6. Create a session for the user
  const session = await createSessionInsecure(token, userWithPasswordHash.id);
  if (!session) {
    return ExpoApiResponse.json(
      { error: 'Session creation failed' },
      { status: 500 },
    );
  }

  // 7. Serialize the session token and set it in a cookie
  const serializedCookie = createSerializedRegisterSessionTokenCookie(
    session.token,
  );

  // 8. Return the user data with the cookie in the response
  return ExpoApiResponse.json(
    { user: { username: userWithPasswordHash.username } },
    { headers: { 'Set-Cookie': serializedCookie } },
  );
}
