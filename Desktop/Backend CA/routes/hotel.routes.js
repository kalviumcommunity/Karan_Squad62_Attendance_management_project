const express = require('express');
const Restaurant = require('../models/hotel.model.js');
const router = express.Router();

// Get a specific restaurant
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate('items');
    if (!restaurant) return res.status(404).send('Restaurant not found');
    res.json(restaurant);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create a new restaurant
router.post('/', async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a restaurant
router.patch('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!restaurant) return res.status(404).send('Restaurant not found');
    res.json(restaurant);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a restaurant
router.delete('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) return res.status(404).send('Restaurant not found');
    res.send('Restaurant deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;