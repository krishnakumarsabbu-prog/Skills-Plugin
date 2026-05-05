# Code Review User Instructions

When invoking this skill, paste the code you want reviewed and optionally provide:
- The programming language (if not obvious)
- Context about what the code is supposed to do
- Any specific concerns you want focused on

Example:
```
Review this TypeScript function for bugs and performance issues:

function fetchUsers(ids) {
  return ids.map(id => db.query(`SELECT * FROM users WHERE id = ${id}`));
}
```
