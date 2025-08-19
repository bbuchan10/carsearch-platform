import express from 'express';
import Model from '../models/Model.js';

const router = express.Router();

// GET all models (optionally filter by makeId)
router.get('/', async (req, res) => {
  try {
    const { makeId } = req.query;
    const models = await Model.getAll(makeId);
    res.json(models);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single model
router.get('/:id', async (req, res) => {
  try {
    const model = await Model.getById(req.params.id);
    if (!model) return res.status(404).json({ error: 'Model not found' });
    res.json(model);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE model
router.post('/', async (req, res) => {
  try {
    const { makeId, model } = req.body;
    const newModel = await Model.createModel(makeId, model);
    res.status(201).json(newModel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE model
router.put('/:id', async (req, res) => {
  try {
    const updatedModel = await Model.updateModel(req.params.id, req.body);
    if (!updatedModel) return res.status(404).json({ error: 'Model not found' });
    res.json(updatedModel);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE model
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Model.deleteModel(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Model not found' });
    res.json({ message: 'Model deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
