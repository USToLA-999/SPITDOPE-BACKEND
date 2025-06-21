// backend/server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Example route
app.post("/api/orders", (req, res) => {
  const { customer, products, total } = req.body;

  const { name, phone, address, state, city, zipcode } = customer;
  const productsJSON = JSON.stringify(products);

  const query = `
    INSERT INTO orders (name, phone, address, state, city, zipcode, products, total)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [name, phone, address, state, city, zipcode, productsJSON, total],
    (err, result) => {
      if (err) {
        console.error("❌ Order Insertion Error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ success: true, orderId: result.insertId });
    }
  );
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
app.use(cors());
app.use(express.json());
