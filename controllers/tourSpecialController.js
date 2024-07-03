const Tour = require('./../models/tourModel');
const Booking = require('./../models/bookingModel');
const catchAsync = require('./../utils/catchAsync');

const AppError = require('./../utils/appError');


exports.getTour = catchAsync(async (req,res,next) => {
    const tour = await Tour.findOne({slug:req.params.slug}).populate({
        path: 'reviews',
        fields: 'review rating user'
    });

    if( !tour ) {
      return next(new AppError('There is no tour with that name.', 404));
    }

    res.status(200).json({
        status: "success",
        data: {
          tour,
        },
      });
});