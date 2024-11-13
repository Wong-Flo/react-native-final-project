import { createGoalInsecure, getGoalsInsecure } from '../../../database/goals';
import { ExpoApiResponse } from '../../../ExpoApiResponse';
import {
  type Goal,
  goalSchema,
} from '../../../migrations/00002-createTableGoals';

export type GoalsResponseBodyGet = {
  goals: Goal[];
};

export async function GET(): Promise<ExpoApiResponse<GoalsResponseBodyGet>> {
  const goals = await getGoalsInsecure();

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
  const requestBody = await request.json();

  const result = goalSchema.safeParse(requestBody);

  if (!result.success) {
    return ExpoApiResponse.json(
      {
        error: 'Request does not contain goal object',
        errorIssues: result.error.issues,
      },
      {
        status: 400,
      },
    );
  }

  const newGoal = {
    goal: result.data.goal,
    goal_amount: result.data.goalAmount,
  };

  const goal = await createGoalInsecure(newGoal);

  if (!goal) {
    return ExpoApiResponse.json(
      {
        error: 'Goal not created',
      },
      {
        status: 500,
      },
    );
  }

  return ExpoApiResponse.json({ goal: goal });
}
