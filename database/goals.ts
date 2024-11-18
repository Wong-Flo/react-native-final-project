import { sql } from '../database/connect';
import type { Goal } from '../migrations/00000-createTableGoals';

// Function to create a goal (with user_id, goal, and goal_amount, and auto-generated id)
export async function createGoalInsecure(
  newGoal: Goal, // No need to omit id from the type, but don't pass it when creating
): Promise<Goal | null> {
  try {
    // Insert the new goal into the database, letting the database auto-generate the id
    const [goal] = await sql<Goal[]>`
      INSERT INTO goals (
        user_id,
        goal,
        goal_amount
      )
      VALUES (
        ${newGoal.user_id},
        ${newGoal.goal},
        ${newGoal.goal_amount}
      )
      RETURNING *;  -- This will return the created goal with the auto-generated id
    `;
    return goal || null; // Return the created goal or null if failed
  } catch (error) {
    console.error('Error creating goal:', error);
    return null; // Return null if there was an error
  }
}

// Function to get all goals
export async function getGoalsInsecure(): Promise<Goal[]> {
  try {
    // Fetch all goals from the database
    const result = await sql<Goal[]>`
      SELECT
        *
      FROM
        goals;
    `;
    return result; // Return the list of goals
  } catch (error) {
    console.error('Error fetching goals:', error);
    return []; // Return an empty array if there was an error
  }
}

// Function to get a single goal by ID
export async function getGoalInsecure(id: number): Promise<Goal | null> {
  try {
    // Fetch a specific goal by ID
    const result = await sql<Goal[]>`
      SELECT
        * FROM
        goals
      WHERE id = ${id};
    `;
    return result[0] || null; // Return the goal if found or null if not found
  } catch (error) {
    console.error('Error fetching goal:', error);
    return null; // Return null if there was an error
  }
}

// Function to update a goal
export async function updateGoalInsecure(goal: Goal): Promise<Goal | null> {
  try {
    // Update the goal in the database
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
    return result[0] || null; // Return the updated goal or null if the update failed
  } catch (error) {
    console.error('Error updating goal:', error);
    return null; // Return null if there was an error
  }
}

// Function to delete a goal
export async function deleteGoalInsecure(id: number): Promise<Goal | null> {
  try {
    // Delete the goal by ID
    const result = await sql<Goal[]>`
      DELETE FROM
        goals
      WHERE
        id = ${id}
      RETURNING *;
    `;
    return result[0] || null; // Return the deleted goal or null if deletion failed
  } catch (error) {
    console.error('Error deleting goal:', error);
    return null; // Return null if there was an error
  }
}
