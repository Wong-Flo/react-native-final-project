// reworked page

import { createGoalInsecure, getGoalsInsecure } from '../../../database/goals';
import { ExpoApiResponse } from '../../../ExpoApiResponse';
import {
  type Goal,
  goalSchema,
} from '../../../migrations/00000-createTableGoals';

//GET - Fetch all goals
export type GoalsResponseBodyGet = {
  goals: Goal[];
};

export async function GET(): Promise<ExpoApiResponse<GoalsResponseBodyGet>> {
  const goals = await getGoalsInsecure();
  return ExpoApiResponse.json({ goals });
}

// POST - Create a new goal
export type GoalsResponseBodyPost =
  | { goal: Goal }
  | { error: string; errorIssues?: { message: string }[] };

export async function POST(
  request: Request,
): Promise<ExpoApiResponse<GoalsResponseBodyPost>> {
  const requestBody = await request.json();
  console.log(requestBody);
  const result = goalSchema.safeParse(requestBody);

  if (!result.success) {
    return ExpoApiResponse.json(
      {
        error: 'Request does not contain valid goal object check here 1',
        errorIssues: result.error.issues,
      },
      { status: 400 },
    );
  }

  const newGoal = result.data;
  const goal = await createGoalInsecure(newGoal);

  if (!goal) {
    return ExpoApiResponse.json(
      { error: 'Goal not created check here 2' },
      { status: 500 },
    );
  }

  return ExpoApiResponse.json({ goal });
}

// missing this
/*  // 3. Get the token from the cookie
 const cookies = parse(request.headers.get('cookie') || '');
 const token = cookies.sessionToken;

 if (!token) {
   return ExpoApiResponse.json({
     error: 'No session token found',
   });
 }
 */
