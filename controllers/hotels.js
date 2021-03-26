//const path = require('path');
//const ErrorResponse = require('../utils/errorResponse');
//const asyncHandler = require('../middleware/async');
//const geocoder = require('../utils/geocoder');
const Hotel = require('../models/Hotel');

// @desc      Get all hotels
// @route     GET /api/v1/hotels
// @access    Public
exports.getHotels = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single hotel
// @route     GET /api/v1/hotels/:id
// @access    Public
exports.getHotel = asyncHandler(async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id);

  if (!hotel) {
    return next(
      new ErrorResponse(`Hotel not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: hotel });
});

// @desc      Create new hotel
// @route     POST /api/v1/hotels
// @access    Private
exports.createHotel = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.user = req.user.id;

  // Check for published hotel
  const publishedHotel = await Hotel.findOne({ user: req.user.id });

  // // If the user is not an admin, they can only add one bootcamp
  // if (publishedBootcamp && req.user.role !== 'admin') {
  //   return next(
  //     new ErrorResponse(
  //       `The user with id ${req.user.id} has already published a bootcamp`,
  //       400
  //     )
  //   );
  // }

  const hotel = await Hotel.create(req.body);

  res.status(201).json({
    success: true,
    data: hotel,
  });
});

// @desc      Update hotel
// @route     PUT /api/v1/hotels/:id
// @access    Private
exports.updateHotel = asyncHandler(async (req, res, next) => {
  const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!hotel) {
    return next(
      new ErrorResponse(`Hotel not found with id of ${req.params.id}`, 404)
    );
  }

  // // Make sure user is bootcamp owner
  // if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
  //   return next(
  //     new ErrorResponse(
  //       `User ${req.params.id} is not authorized to update this bootcamp`,
  //       401
  //     )
  //   );
  // }

  // hotel = await Hotel.findOneAndUpdate(req.params.id, req.body, {
  //   new: true,
  //   runValidators: true,
  // });

  res.status(200).json({ success: true, data: hotel });
});

// @desc      Delete hotel
// @route     DELETE /api/v1/hotels/:id
// @access    Private
exports.deleteHotel = asyncHandler(async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id);

  if (!hotel) {
    return next(
      new ErrorResponse(`Hotel not found with id of ${req.params.id}`, 404)
    );
  }

  // // Make sure user is bootcamp owner
  // if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
  //   return next(
  //     new ErrorResponse(
  //       `User ${req.params.id} is not authorized to delete this bootcamp`,
  //       401
  //     )
  //   );
  // }

  bootcamp.remove();

  res.status(200).json({ success: true, data: {} });
});
