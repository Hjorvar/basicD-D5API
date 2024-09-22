const express = require('express');
const router = express.Router();
const axios = require('axios');

// Home route - Fetch all spells
router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://www.dnd5eapi.co/api/spells');
    res.render('index', { spells: response.data.results });
  } catch (error) {
    res.status(500).send('Error fetching spell data');
  }
});

// Search route - Fetch specific spell by name
router.get('/search', async (req, res) => {
  const spellName = req.query.name.toLowerCase();
  try {
    const response = await axios.get('https://www.dnd5eapi.co/api/spells');
    const spells = response.data.results.filter(spell => spell.name.toLowerCase() === spellName);
    if (spells.length > 0) {
      res.render('index', { spells });
    } else {
      res.status(404).send('Spell not found');
    }
  } catch (error) {
    res.status(500).send('Error fetching spell data');
  }
});

// New route to fetch and display spell details
router.get('/spell/:index', async (req, res) => {
  const spellIndex = req.params.index;
  try {
    const response = await axios.get(`https://www.dnd5eapi.co/api/spells/${spellIndex}`);
    res.render('spell', { spell: response.data });
  } catch (error) {
    res.status(500).send('Error fetching spell details');
  }
});

module.exports = router;
