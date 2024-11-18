import { parse } from 'cookie'; // To parse cookies
import { deleteSession } from '../../../database/sessions'; // Function to remove the session
import { ExpoApiResponse } from '../../../ExpoApiResponse';
import { deleteSerializedRegisterSessionTokenCookie } from '../../../util/cookies'; // Function to delete the cookie

export type LogoutResponseBodyPost = { message: string } | { error: string };

export async function POST(
  request: Request,
): Promise<ExpoApiResponse<LogoutResponseBodyPost>> {
  // 1. Get the session token from the cookies
  const cookies = parse(request.headers.get('cookie') || ''); // Parse the cookies from the request
  const sessionToken = cookies['sessionToken']; // Assuming the cookie name is 'sessionToken'

  if (!sessionToken) {
    return ExpoApiResponse.json(
      { error: 'No session token found, user is not logged in' },
      { status: 400 },
    );
  }

  // 2. Delete the session from the database
  const sessionDeletion = await deleteSession(sessionToken);

  if (!sessionDeletion) {
    return ExpoApiResponse.json(
      { error: 'Failed to delete session' },
      { status: 500 },
    );
  }

  // 3. Delete the session cookie from the user's browser
  const serializedCookie = deleteSerializedRegisterSessionTokenCookie();

  // 4. Respond to the user
  return ExpoApiResponse.json(
    { message: 'Successfully logged out' },
    { headers: { 'Set-Cookie': serializedCookie } }, // Setting the expired cookie
  );
}
