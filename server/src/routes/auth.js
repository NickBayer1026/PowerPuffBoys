const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { z } = require('zod');

const db = require('../db');
const config = require('../config');
const { validate } = require('../utils/validate');
const { HttpError } = require('../utils/errors');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(1, 'Full name is required'),
  studentNo: z.string().optional(),
  course: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

function publicUser(row) {
  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    studentNo: row.student_no,
    course: row.course,
    createdAt: row.created_at,
  };
}

function signToken(user) {
  return jwt.sign({ sub: String(user.id) }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
}

// POST /api/auth/register
router.post('/register', (req, res) => {
  const data = validate(registerSchema, req.body);
  const email = data.email.toLowerCase();

  if (db.prepare('SELECT id FROM users WHERE email = ?').get(email)) {
    throw new HttpError(409, 'Email is already registered');
  }

  const hash = bcrypt.hashSync(data.password, 10);
  const info = db
    .prepare(
      'INSERT INTO users (email, password_hash, full_name, student_no, course) VALUES (?, ?, ?, ?, ?)',
    )
    .run(email, hash, data.fullName, data.studentNo ?? null, data.course ?? null);

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json({ token: signToken(user), user: publicUser(user) });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const data = validate(loginSchema, req.body);
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(data.email.toLowerCase());

  if (!user || !bcrypt.compareSync(data.password, user.password_hash)) {
    throw new HttpError(401, 'Invalid email or password');
  }

  res.json({ token: signToken(user), user: publicUser(user) });
});

// GET /api/auth/me
router.get('/me', requireAuth, (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.userId);
  if (!user) throw new HttpError(404, 'User not found');
  res.json({ data: publicUser(user) });
});

module.exports = router;
