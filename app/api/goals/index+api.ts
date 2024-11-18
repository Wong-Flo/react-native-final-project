import { createGoalInsecure, getGoalsInsecure } from '../../../database/goals';
import { getValidSession } from '../../../database/sessions';
import { ExpoApiResponse } from '../../../ExpoApiResponse';
import {
  type Goal,
  goalSchema,
} from '../../../migrations/00000-createTableGoals';

// Utility function to parse cookies
function parseCookies(cookieHeader: string): Record<string, string> {
  return Object.fromEntries(
    cookieHeader.split('; ').map((cookie) => cookie.split('=')),
  );
}

// GET - Fetch all goals
export type GoalsResponseBodyGet = {
  goals: Goal[];
};
export async function GET(): Promise<ExpoApiResponse<GoalsResponseBodyGet>> {
  try {
    const goals = await getGoalsInsecure();
    return ExpoApiResponse.json({ goals });
  } catch (error) {
    // Return an empty array for goals and an error message
    return ExpoApiResponse.json(
      { goals: [], error: 'Error fetching goals' },
      { status: 500 },
    );
  }
}
// POST - Create a new goal
export type GoalsResponseBodyPost =
  | { goal: Goal }
  | { error: string; errorIssues?: { message: string }[] };

export async function POST(
  request: Request,
): Promise<ExpoApiResponse<GoalsResponseBodyPost>> {
  try {
    // Extract cookies from the request
    const cookieHeader = request.headers.get('Cookie');
    if (!cookieHeader) {
      return ExpoApiResponse.json(
        { error: 'Unauthorized: No cookies found' },
        { status: 401 },
      );
    }

    // Parse the session token from cookies
    const cookies = parseCookies(cookieHeader);
    const sessionToken = cookies.sessionToken;

    if (!sessionToken) {
      return ExpoApiResponse.json(
        { error: 'Unauthorized: No session token found' },
        { status: 401 },
      );
    }

    // Validate session and get user_id
    const session = await getValidSession(sessionToken);
    if (!session) {
      return ExpoApiResponse.json(
        { error: 'Unauthorized: Invalid or expired session' },
        { status: 401 },
      );
    }

    // Extract user ID from the session
    const userId = session.userId;

    // Get the request body (goal data)
    const requestBody = await request.json();

    // Add user_id to the goal data
    const requestWithUserId = { ...requestBody, user_id: userId };

    // Validate the data with the schema
    const result = goalSchema.safeParse(requestWithUserId);

    if (!result.success) {
      return ExpoApiResponse.json(
        {
          error: 'Request does not contain a valid goal object.',
          errorIssues: result.error.issues,
        },
        { status: 400 },
      );
    }

    const newGoal = result.data;

    // Store the goal in the database
    const goal = await createGoalInsecure(newGoal);

    if (!goal) {
      return ExpoApiResponse.json(
        { error: 'Goal could not be created.' },
        { status: 500 },
      );
    }

    // Return the created goal
    return ExpoApiResponse.json({ goal });
  } catch (error) {
    console.error('Error during goal creation:', error);
    return ExpoApiResponse.json(
      { error: 'An unexpected error occurred while creating the goal.' },
      { status: 500 },
    );
  }
}
