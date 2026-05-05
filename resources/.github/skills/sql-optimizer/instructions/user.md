# SQL Optimizer User Instructions

Paste the SQL query you want optimized. Optionally provide:
- The database engine (PostgreSQL, MySQL, etc.)
- Table row counts if known
- Existing indexes on the tables
- The EXPLAIN output if available

Example:
```sql
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2024-01-01'
GROUP BY u.id, u.name
ORDER BY order_count DESC;
```
