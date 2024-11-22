import type { Session } from '../migrations/00002-createTableSessions';
import type { Expense } from '../migrations/00003-createTableExpenses';
import { sql } from './connect';

export async function getExpenses(sessionToken: Session['token']) {
  const expenses = await sql<Expense[]>`
  SELECT
  expenses.*
  from
  expenses
  INNER JOIN sessions ON(
    sessions.token =${sessionToken}
    AND sessions.user_id = expenses.user_id
    AND expiry_timestamp > now()
  )

  `;
  return expenses;
}
export async function getExpense(
  sessionToken: Session['token'],
  expenseId: Expense['id'],
) {
  const [expense] = await sql<Expense[]>`
SELECT
expenses.*
FROM
expenses
INNER JOIN sessions ON(

  token = ${sessionToken}
  AND sessions.user_id = expenses.user_id
  AND expiry_timestamp > now()
)
WHERE
expenses.id = ${expenseId}

  `;
  return expense;
}

export async function createExpense(
  sessionToken: Session['token'],
  createdAt: Expense['createdAt'],
  selectedCategory: Expense['selectedCategory'],
  item: Expense['item'],
  price: Expense['price'],
  descriptionText: Expense['descriptionText'],
) {
  const [expense] = await sql<Expense[]>`

INSERT INTO
expenses (user_id, created_at, selected_category, item, price, description_text)(
  SELECT
  user_id,
  ${createdAt},
  ${selectedCategory},
  ${item},
  ${price},
  ${descriptionText}
  FROM
  sessions
  WHERE
  token = ${sessionToken}
  AND sessions.expiry_timestamp > now()

)
RETURNING
expenses.*
`;
  return expense;
}
export const deleteExpense = async (expenseId: Expense['id']) => {
  const [expense] = await sql<Expense[]>`
  DELETE FROM expenses
  WHERE

  id=${expenseId}
  RETURNING
  expenses.*
  `;
  return expense;
};
