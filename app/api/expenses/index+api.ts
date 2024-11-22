import { parse } from 'cookie';
import { createExpense, getExpenses } from '../../../database/expenses';
import { ExpoApiResponse } from '../../../ExpoApiResponse';
import {
  type Expense,
  expenseSchema,
} from '../../../migrations/00003-createTableExpenses';

export type ExpensesResponseBodyGet =
  | {
      expenses: Expense[];
    }
  | {
      error: string;
      errorIssues?: { message: string }[];
    };
export async function GET(
  request: Request,
): Promise<ExpoApiResponse<ExpensesResponseBodyGet>> {
  const cookies = parse(request.headers.get('cookie') || '');
  const token = cookies.sessionToken;
  if (!token) {
    return ExpoApiResponse.json({
      error: 'No session token found BM09',
    });
  }
  const expenses = await getExpenses(token);
  return ExpoApiResponse.json({
    expenses: expenses,
  });
}
export type ExpensesResponseBodyPost =
  | {
      expense: Expense;
    }
  | {
      error: string;
      errorIssues?: { message: string }[];
    };
export async function POST(
  request: Request,
): Promise<ExpoApiResponse<ExpensesResponseBodyPost>> {
  const requestBody = await request.json();
  const result = expenseSchema.safeParse(requestBody);
  if (!result.success) {
    return ExpoApiResponse.json(
      {
        error: 'Request does not contain expense object BM09',
      },
      {
        status: 400,
      },
    );
  }
  const cookies = parse(request.headers.get('cookie') || '');

  const token = cookies.sessionToken;
  if (!token) {
    return ExpoApiResponse.json({
      error: 'No session token fround BM 909',
    });
  }
  // Ensure `createdAt` is converted to a Date or handled if undefined
  const { createdAt, selectedCategory, item, price, descriptionText } =
    result.data;
  //create Expense
  const newExpense =
    token &&
    (await createExpense(
      token,
      new Date(createdAt),
      selectedCategory,
      item,
      price,
      descriptionText,
    ));

  // If the Expense creation fails, return an error

  if (!newExpense) {
    return ExpoApiResponse.json(
      {
        error: 'Goal not created or access denied creating expense BM090',
      },
      {
        status: 500,
      },
    );
  }

  // Return the text content of the goal
  return ExpoApiResponse.json({ expense: newExpense });
}
