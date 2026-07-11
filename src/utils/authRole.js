export function validateLogin(email, password, role) {
  const adminCredentials = {
    email: 'admin@railway.com',
    password: 'admin123',
  };

  const userCredentials = {
    email: 'user@railway.com',
    password: 'user123',
  };

  const expectedCredentials = role === 'admin' ? adminCredentials : userCredentials;

  if (email === expectedCredentials.email && password === expectedCredentials.password) {
    return { ok: true, role, error: null };
  }

  if (
    (email === adminCredentials.email && password === adminCredentials.password && role !== 'admin') ||
    (email === userCredentials.email && password === userCredentials.password && role !== 'user')
  ) {
    return {
      ok: false,
      role: null,
      error: 'The selected role does not match the provided credentials.',
    };
  }

  return {
    ok: false,
    role: null,
    error: 'Invalid email or password.',
  };
}
