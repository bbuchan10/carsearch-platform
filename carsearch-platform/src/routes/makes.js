import express from 'express';
import Make from '../models/Make.js';

const router = express.Router();

// GET all makes
router.get('/', async (req, res) => {
  try {
    const makes = await Make.getAll();
    res.json(makes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single make
router.get('/:id', async (req, res) => {
  try {
    const make = await Make.getById(req.params.id);
    if (!make) return res.status(404).json({ error: 'Make not found' });
    res.json(make);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE make
router.post('/', async (req, res) => {
  try {
    const { make, region } = req.body;
    const newMake = await Make.createMake(make, region);
    res.status(201).json(newMake);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE make
router.put('/:id', async (req, res) => {
  try {
    const updatedMake = await Make.updateMake(req.params.id, req.body);
    if (!updatedMake) return res.status(404).json({ error: 'Make not found' });
    res.json(updatedMake);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE make
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Make.deleteMake(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Make not found' });
    res.json({ message: 'Make deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
