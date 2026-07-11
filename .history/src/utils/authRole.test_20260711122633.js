import test from 'node:test';
import assert from 'node:assert/strict';
import { validateLogin } from './authRole.js';

test('accepts admin credentials for admin login', () => {
  assert.deepEqual(validateLogin('admin@railway.com', 'admin123', 'admin'), {
    ok: true,
    role: 'admin',
    error: null,
  });
});

test('accepts user credentials for user login', () => {
  assert.deepEqual(validateLogin('user@railway.com', 'user123', 'user'), {
    ok: true,
    role: 'user',
    error: null,
  });
});

test('rejects mismatched role credentials', () => {
  assert.deepEqual(validateLogin('user@railway.com', 'user123', 'admin'), {
    ok: false,
    role: null,
    error: 'The selected role does not match the provided credentials.',
  });
});
