# Security Auditor User Instructions

Provide the code you want audited. Optionally specify:
- The application type (web app, API, CLI tool, etc.)
- The tech stack and framework
- Any compliance requirements (PCI-DSS, HIPAA, SOC 2, etc.)
- Areas of particular concern

Example:
```javascript
app.get('/user', (req, res) => {
  const userId = req.query.id;
  db.query(`SELECT * FROM users WHERE id = ${userId}`, (err, rows) => {
    res.json(rows);
  });
});

app.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === 'admin123') {
    req.session.admin = true;
    res.json({ success: true });
  }
});
```
