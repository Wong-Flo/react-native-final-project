import type { Goal } from '../migrations/00000-createTableGoals';
import type { Session } from '../migrations/00002-createTableSessions';
import { sql } from './connect';

export async function getGoals(sessionToken: Session['token']) {
  const goals = await sql<Goal[]>`
  SELECT
  goals.*
  FROM
  goals
  INNER JOIN sessions ON(
    sessions.token =${sessionToken}
    AND sessions.user_id = goals.user_id
    AND expiry_timestamp > now()
  )
  `;
  return goals;
}
export async function getGoal(
  sessionToken: Session['token'],
  goalId: Goal['id'],
) {
  const [goal] = await sql<Goal[]>`
  SELECT
  goals.*
  FROM
  goals
  INNER JOIN sessions ON (
  token = ${sessionToken}
    AND sessions.user_id = goals.user_id
    AND expiry_timestamp > now()
  )
  WHERE
  goals.id = ${goalId}

  `;
  return goal;
}
export async function createGoal(
  sessionToken: Session['token'],
  goalTitle: Goal['goalTitle'],
  goalAmountContent: Goal['goalAmountContent'],
) {
  const [goal] = await sql<Goal[]>`
  INSERT INTO
  goals (user_id,goal_title,goal_amount_content)(
    SELECT
    user_id,
    ${goalTitle},
    ${goalAmountContent}
    FROM
    sessions
    WHERE
    token = ${sessionToken}
    AND sessions.expiry_timestamp > now()
  )
  RETURNING
  goals.*
  `;
  return goal;
}
export const deleteGoal = async (goalId: Goal['id']) => {
  const [goal] = await sql<Goal[]>`
    DELETE FROM goals
    WHERE
      id = ${goalId}
    RETURNING
      goals.*
  `;
  return goal;
};
