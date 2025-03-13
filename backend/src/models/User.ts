import { pool } from '../config/mysql';

export interface User {
  userId: string;
  name: string;
  totalScore: number;
}

export const createUserTable = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      userId VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255),
      totalScore INT DEFAULT 0
    )
  `);
};

export const upsertUser = async (user: User) => {
  await pool.query(`
    INSERT INTO users (userId, name, totalScore)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE totalScore = totalScore + VALUES(totalScore)
  `, [user.userId, user.name, user.totalScore]);
};