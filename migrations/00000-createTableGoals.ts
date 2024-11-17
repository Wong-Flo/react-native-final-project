//reworked

import type { Sql } from 'postgres';
import { z } from 'zod';

export type Goal = {
  id: number;
  user_id: number;
  goal: string;
  goal_amount: number;
};

export const goalSchema = z.object({
  // user_id: z.number().min(1),
  goal: z.string().min(3),
  goal_amount: z.number().min(1),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE goals (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      goal VARCHAR(255) NOT NULL,
      goal_amount DECIMAL(10, 2) NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE goals`;
}
