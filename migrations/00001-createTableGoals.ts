import type { Sql } from 'postgres';
import { z } from 'zod';

export type User = {
  user_id: number;
  goal: string;
  goal_amount: number;
};

export const goalSchema = z.object({
  goal: z.string().min(3),
  goalAmount: z.number().min(3),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE goals (
      user_id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      goal varchar(80) NOT NULL,
      goalAmount varchar(80) NOT NULL
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE goals`;
}
// was drop table users, manually changed to goals, hope its not a problem
