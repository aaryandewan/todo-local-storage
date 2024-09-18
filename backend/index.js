const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

// Initialize Express app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS to allow requests from frontend
app.use(express.json()); // Enable JSON request bodies

// Set up PostgreSQL connection using a pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todos_db",
  password: "aaryan",
  port: 5432,
});

// Test database connection
pool.connect((err) => {
  if (err) {
    console.error("Failed to connect to database:", err);
  } else {
    console.log("Connected to PostgreSQL database");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// Add a new todo
app.post("/todos", async (req, res) => {
  const { text, completed } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO todos (text, completed) VALUES ($1, $2) RETURNING *",
      [text, completed]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add todo" });
  }
});

// Update an existing todo
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  try {
    const result = await pool.query(
      "UPDATE todos SET text = $1, completed = $2 WHERE id = $3 RETURNING *",
      [text, completed, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM todos WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});
