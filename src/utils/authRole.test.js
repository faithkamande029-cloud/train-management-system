import test from 'node:test';
import assert from 'node:assert/strict';
import { validateLogin, validatePasswordReset, validateSignup } from './authRole.js';

test('accepts admin credentials for admin login', () => {
  assert.equal(validateLogin('admin@railway.com', 'admin123', 'admin').ok, true);
});

test('accepts user credentials for user login', () => {
  assert.equal(validateLogin('user@railway.com', 'user123', 'user').ok, true);
});

test('accepts a newly registered account', () => {
  const accounts = [{ name: 'Ada', email: 'ada@example.com', password: 'secret1', role: 'user' }];
  assert.equal(validateLogin('ADA@example.com', 'secret1', 'user', accounts).ok, true);
});

test('validates sign-up requirements and duplicate emails', () => {
  assert.deepEqual(validateSignup('', 'ada@example.com', 'secret1', 'secret1'), { ok: false, error: 'Please enter your name.' });
  assert.deepEqual(validateSignup('Ada', 'ada@example.com', 'secret1', 'mismatch'), { ok: false, error: 'Passwords do not match.' });
  assert.deepEqual(validateSignup('Ada', 'user@railway.com', 'secret1', 'secret1'), { ok: false, error: 'An account with this email already exists.' });
  assert.deepEqual(validateSignup('Ada', 'ada@example.com', 'secret1', 'secret1'), { ok: true, error: null });
});

test('validates password reset against an existing account', () => {
  assert.deepEqual(validatePasswordReset('missing@example.com', 'secret1', 'secret1'), { ok: false, error: 'No account was found for that email address.' });
  assert.deepEqual(validatePasswordReset('user@railway.com', 'secret1', 'secret1'), { ok: true, error: null });
});

test('rejects mismatched role credentials', () => {
  assert.deepEqual(validateLogin('user@railway.com', 'user123', 'admin'), {
    ok: false,
    role: null,
    error: 'The selected role does not match the provided credentials.',
  });
});
