import { parse } from 'cookie';
import { createGoal, getGoals } from '../../../database/goals';
import { ExpoApiResponse } from '../../../ExpoApiResponse';
import {
  type Goal,
  goalSchema,
} from '../../../migrations/00000-createTableGoals';

export type GoalsResponseBodyGet =
  | {
      goals: Goal[];
    }
  | {
      error: string;
      errorIssues?: { message: string }[];
    };

export async function GET(
  request: Request,
): Promise<ExpoApiResponse<GoalsResponseBodyGet>> {
  // 1. get the session token from the cookie
  const cookies = parse(request.headers.get('cookie') || '');
  const token = cookies.sessionToken;

  if (!token) {
    return ExpoApiResponse.json({
      error: 'No session token found BM2',
    });
  }
  const goals = await getGoals(token);
  return ExpoApiResponse.json({
    goals: goals,
  });
}

export type GoalsResponseBodyPost =
  | {
      goal: Goal;
    }
  | {
      error: string;
      errorIssues?: { message: string }[];
    };
export async function POST(
  request: Request,
): Promise<ExpoApiResponse<GoalsResponseBodyPost>> {
  // Get the goal Date from the request
  const requestBody = await request.json();
  console.log(requestBody);
  //Validate goals data with ZOD
  const result = goalSchema.safeParse(requestBody);

  if (!result.success) {
    return ExpoApiResponse.json(
      {
        error: 'Request does not contain goal object BM3',
        errorIssues: result.error.issues,
      },
      {
        status: 400,
      },
    );
  }
  // get the token from the cookie
  const cookies = parse(request.headers.get('cookie') || '');

  const token = cookies.sessionToken;
  if (!token) {
    return ExpoApiResponse.json({
      error: 'No session token found BM82',
    });
  }

  //4. create the goal
  const newGoal =
    token &&
    (await createGoal(token, result.data.goalTitle, result.data.goalAmount));

  //5. If the goal creation fails, return an error

  if (!newGoal) {
    return ExpoApiResponse.json(
      {
        error: 'Goal not created or access denied creating goal BM5',
      },
      {
        status: 500,
      },
    );
  }
  // 6. Return the text content of the goal
  return ExpoApiResponse.json({ goal: newGoal });
}
