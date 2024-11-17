// new version

import { sql } from '../database/connect';
import type { Goal } from '../migrations/00000-createTableGoals';

// Function to create a goal
export async function createGoalInsecure(
  newGoal: Omit<Goal, 'id'>,
): Promise<Goal | null> {
  try {
    const [goal] = await sql<Goal[]>`
      INSERT INTO
      goals (
        user_id,
        goal,
        goal_amount
        )
      SELECT (
        ${newGoal.user_id},
        ${newGoal.goal},
        ${newGoal.goal_amount}
        )
      RETURNING *;
    `;
    return goal || null;
  } catch (error) {
    console.error('Error creating goal:', error);
    return null;
  }
}
// Function to get all goals
export async function getGoalsInsecure(): Promise<Goal[]> {
  try {
    const result = await sql<Goal[]>`
      SELECT
       *
       FROM
       goals;
    `;
    return result;
  } catch (error) {
    console.error('Error fetching goals:', error);
    return [];
  }
}

// Function to get a single goal by ID
export async function getGoalInsecure(id: number): Promise<Goal | null> {
  try {
    const result = await sql<Goal[]>`
      SELECT
      * FROM
      goals
      WHERE id = ${id};
    `;
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching goal:', error);
    return null;
  }
}

// Function to update a goal
export async function updateGoalInsecure(goal: Goal): Promise<Goal | null> {
  try {
    const result = await sql<Goal[]>`
      UPDATE
      goals
      SET
      goal = ${goal.goal},
      goal_amount = ${goal.goal_amount}
      WHERE
      id = ${goal.id}
      RETURNING *;
    `;
    return result[0] || null;
  } catch (error) {
    console.error('Error updating goal:', error);
    return null;
  }
}

// Function to delete a goal
export async function deleteGoalInsecure(id: number): Promise<Goal | null> {
  try {
    const result = await sql<Goal[]>`
      DELETE FROM
      goals
      WHERE
      id = ${id}
      RETURNING *;
    `;
    return result[0] || null;
  } catch (error) {
    console.error('Error deleting goal:', error);
    return null;
  }
}
