const express = require("express");
const router = express.Router();
const dbHandler = require("../models/accounts");

// Create (POST): Add a new item
router.post("/inventory", (req, res) => {
  const { item_name, category, quantity, price_per_unit, supplier } = req.body;
  const sql =
    "INSERT INTO Inventory (item_name, category, quantity, price_per_unit, supplier) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [item_name, category, quantity, price_per_unit, supplier],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Item added", item_id: result.insertId });
    }
  );
});

// Read (GET): Get all items
router.get("/inventory", (req, res) => {
  db.query("SELECT * FROM Inventory", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Update (PUT): Update an item’s details
router.put("/inventory/:id", (req, res) => {
  const { id } = req.params;
  const { quantity, price_per_unit } = req.body;
  const sql =
    "UPDATE Inventory SET quantity = ?, price_per_unit = ? WHERE item_id = ?";
  db.query(sql, [quantity, price_per_unit, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Item updated" });
  });
});

// Delete (DELETE): Remove an item
router.delete("/inventory/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Inventory WHERE item_id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Item deleted" });
  });
});

module.exports = router;
