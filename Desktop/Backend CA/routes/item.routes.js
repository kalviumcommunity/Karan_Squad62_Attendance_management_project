const express = require('express');
const Restaurant = require('../models/hotel.model.js');
const Item = require('../models/item.model.js');
const router = express.Router();

// Get a specific item
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).send('Item not found');
    res.json(item);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create a new item and add it to a restaurant
router.post('/', async (req, res) => {
  try {
    const { name, price, restaurantId } = req.body;

    // Check if restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(404).send('Restaurant not found');

    // Create item
    const item = new Item({ name, price });
    await item.save();

    // Add item to restaurant's items array
    restaurant.items.push(item._id);
    await restaurant.save();

    res.status(201).json(item);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update an item
router.patch('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).send('Item not found');
    res.json(item);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete an item
router.delete('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).send('Item not found');

    // Remove item from restaurants' items arrays
    await Restaurant.updateMany({ items: item._id }, { $pull: { items: item._id } });

    res.send('Item deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;