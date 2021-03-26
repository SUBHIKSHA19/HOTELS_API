const mongoose = require('mongoose');
//const slugify = require('slugify');
//const geocoder = require('../utils/geocoder');

const HotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    phone: {
      type: String,
      maxlength: [20, 'Phone number cannot be longer than 20 characters'],
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        // /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please add a valid email',
      ],
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
    },
    // location: {
    //   //GeoJSON point
    //   type: {
    //     type: String,
    //     enum: ['Point'],
    //     //required: true,
    //   },
    //   coordinates: {
    //     type: [Number],
    //     index: '2dsphere',
    //     //required: true,
    //   },
    //   formattedAddress: String,
    //   street: String,
    //   city: String,
    //   state: String,
    //   zipcode: String,
    //   country: String,
    // },
    averageRating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [10, 'Rating must can not be more than 10'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Create bootcamp slug from the name
HotelSchema.pre('save', function (next) {
  //console.log('Slugify ran', this.name);
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Hotel', HotelSchema);
