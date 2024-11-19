import type { Sql } from 'postgres';
import { z } from 'zod';

export type Goal = {
  id: number;
  user_id: number;
  goalTitle: string;
  goalAmountContent: number;
};

export const goalSchema = z.object({
  goalTitle: z.string().min(3),
  goalAmountContent: z.number().min(1),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE goals (
      id SERIAL PRIMARY KEY,
      user_id integer NOT NULL,
      goal_title VARCHAR(255) NOT NULL,
      goal_amount_content DECIMAL(10, 2) NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE goals`;
}
