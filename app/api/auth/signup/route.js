import { NextResponse } from 'next/server';
import { Pool } from 'pg';
const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // Check if user already exists
    const { rows: existingUsers } = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json({ error: 'User with this email already exists.' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, 'user')`,
      [name, email, hashedPassword]
    );

    return NextResponse.json({ message: 'User created successfully.' }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
