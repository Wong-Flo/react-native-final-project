import type { Goal } from '../migrations/00002-createTableGoals';
import { sql } from './connect';

export const getGoalsInsecure = async () => {
  const goals = await sql<Goal[]>`
  Select
  *
  from
  goals
  `;
  return goals;
};
export const getGoalInsecure = async (goalId: Goal['user_id']) => {
  const [goal] = await sql<Goal[]>`
    SELECT
      *
    FROM
      goals
    WHERE
      id = ${goalId}
  `;
  return goal;
};
export const createGoalInsecure = async (newGoal: Omit<Goal, 'id'>) => {
  const [goal] = await sql<Goal[]>`
    INSERT INTO
      goals (
        goal,
        goal_amount,

      )
    VALUES
      (
        ${newGoal.goal},
        ${newGoal.goal_amount},

      )
    RETURNING
      goals.*
  `;
  return goal;
};
export const updateGoalInsecure = async (updatedGoal: Goal) => {
  const [goal] = await sql<Goal[]>`
    UPDATE goals
    SET
      goal = ${updatedGoal.goal},
      goal_amount = ${updatedGoal.goal_amount},

    WHERE
      id = ${updatedGoal.user_id}
    RETURNING
      goals.*
  `;
  return goal;
};
export const deleteGoalInsecure = async (goalId: Goal['user_id']) => {
  const [goal] = await sql<Goal[]>`
    DELETE FROM goals
    WHERE
      id = ${goalId}
    RETURNING
      goals.*
  `;
  return goal;
};
