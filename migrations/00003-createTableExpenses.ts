import type { Sql } from 'postgres';
import { z } from 'zod';

export type Expense = {
  id: number;
  user_id: number;
  createdAt: Date;
  selectedCategory: string;
  item: string;
  price: number;
  descriptionText: string;
};

export const expenseSchema = z.object({
  createdAt: z.string(),
  selectedCategory: z.string(),
  item: z.string().min(3),
  price: z.number().min(1),
  descriptionText: z.string().min(5),
});

export async function up(sql: Sql) {
  await sql`
  CREATE TABLE expenses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    selected_category VARCHAR(255) NOT NULL,
    item VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description_text TEXT NOT NULL
  )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE expenses`;
}
