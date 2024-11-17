//rework in progress

import {
  deleteGoalInsecure,
  getGoalInsecure,
  updateGoalInsecure,
} from '../../../database/goals';
import { ExpoApiResponse } from '../../../ExpoApiResponse';
import type { Goal } from '../../../migrations/00000-createTableGoals';
import { goalSchema } from '../../../migrations/00000-createTableGoals';

// GET - Fetch a specific goal by ID
export type GoalResponseBodyGet = { goal: Goal } | { error: string };

export async function GET(
  request: Request,
  { goalId }: { goalId: string },
): Promise<ExpoApiResponse<GoalResponseBodyGet>> {
  const goal = await getGoalInsecure(Number(goalId));

  if (!goal) {
    return ExpoApiResponse.json(
      { error: `No goal with id ${goalId} found check here 3` },
      { status: 404 },
    );
  }

  return ExpoApiResponse.json({ goal });
}

// PUT - Update a specific goal by ID
export type GoalResponseBodyPut =
  | { goal: Goal }
  | { error: string; errorIssues?: { message: string }[] };

export async function PUT(
  request: Request,
  { goalId }: { goalId: string },
): Promise<ExpoApiResponse<GoalResponseBodyPut>> {
  const requestBody = await request.json();
  const result = goalSchema.safeParse(requestBody);

  if (!result.success) {
    return ExpoApiResponse.json(
      { error: 'Invalid input check here 4', errorIssues: result.error.issues },
      { status: 400 },
    );
  }

  const updatedGoal = await updateGoalInsecure({
    id: Number(goalId),
    user_id: Number(goalId),
    goal: result.data.goal,
    goal_amount: result.data.goal_amount,
  });

  if (!updatedGoal) {
    return ExpoApiResponse.json(
      { error: `Goal ${goalId} not found check here 5` },
      { status: 404 },
    );
  }

  return ExpoApiResponse.json({ goal: updatedGoal });
}

// DELETE - Delete a specific goal by ID
export type GoalResponseBodyDelete = { goal: Goal } | { error: string };

export async function DELETE(
  request: Request,
  { goalId }: { goalId: string },
): Promise<ExpoApiResponse<GoalResponseBodyDelete>> {
  const goal = await deleteGoalInsecure(Number(goalId));

  if (!goal) {
    return ExpoApiResponse.json(
      { error: `Goal ${goalId} not found check here 6` },
      { status: 404 },
    );
  }

  return ExpoApiResponse.json({ goal });
}
