# API Documenter User Instructions

Provide your API code, route definitions, or endpoint descriptions. Include:
- The framework used (Express, FastAPI, Spring, etc.)
- Authentication method (JWT, API Key, OAuth, etc.)
- Any existing documentation you want to improve

Example:
```typescript
app.post('/api/users', authenticate, async (req, res) => {
  const { email, password, name } = req.body;
  const user = await createUser({ email, password, name });
  res.status(201).json({ id: user.id, email: user.email });
});

app.get('/api/users/:id', authenticate, async (req, res) => {
  const user = await getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});
```
