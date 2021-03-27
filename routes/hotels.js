const express = require('express');
const {
  getHotels,
  getHotel,
  createHotel,
  updateHotel,
  deleteHotel,
} = require('../controllers/hotels');

const Hotel = require('../models/Hotel');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router();

router.route('/').get(advancedResults(Hotel), getHotels).post(createHotel);

router.route('/:id').get(getHotel).put(updateHotel).delete(deleteHotel);

module.exports = router;
