import {
  deleteGoalInsecure,
  getGoalInsecure,
  updateGoalInsecure,
} from '../../database/goals';
import { ExpoApiResponse } from '../../ExpoApiResponse';
import { type Goal, goalSchema } from '../../migrations/00002-createTableGoals';

export type GoalResponseBodyGet =
  | {
      goal: Goal;
    }
  | {
      error: string;
    };
export async function GET(
  request: Request,
  { goalId }: { goalId: string },
): Promise<ExpoApiResponse<GoalResponseBodyGet>> {
  const goal = await getGoalInsecure(Number(goalId));

  if (!goal) {
    return ExpoApiResponse.json(
      {
        error: `No goal with id ${goalId} found`,
      },
      {
        status: 404,
      },
    );
  }
  return ExpoApiResponse.json({ goal: goal });
}
export type GoalResponseBodyPut =
  | {
      goal: Goal;
    }
  | {
      error: string;
      errorIssues?: { message: string }[];
    };
export async function PUT(
  request: Request,
  { goalId }: { goalId: string },
): Promise<ExpoApiResponse<GoalResponseBodyPut>> {
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

  const updatedGoal = await updateGoalInsecure({
    user_id: Number(goalId),
    goal: result.data.goal,
    goal_amount: result.data.goalAmount,
  });

  if (!updatedGoal) {
    return ExpoApiResponse.json(
      {
        error: `Goal ${goalId} not found`,
      },
      {
        status: 404,
      },
    );
  }

  return ExpoApiResponse.json({ goal: updatedGoal });
}
export type GoalResponseBodyDelete =
  | {
      goal: Goal;
    }
  | {
      error: string;
    };

export async function DELETE(
  request: Request,
  { goalId }: { goalId: string },
): Promise<ExpoApiResponse<GoalResponseBodyDelete>> {
  const goal = await deleteGoalInsecure(Number(goalId));

  if (!goal) {
    return ExpoApiResponse.json(
      {
        error: `Goal ${goalId} not found`,
      },
      {
        status: 404,
      },
    );
  }

  return ExpoApiResponse.json({ goal: goal });
}
