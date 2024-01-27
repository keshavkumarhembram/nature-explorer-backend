const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('./../models/tourModel');
const Booking = require('./../models/bookingModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');

exports.getCheckOutSession =catchAsync( async (req, res, next) => {
    // Get the currently booked tour
    const tour = await Tour.findById(req.params.tourId);

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: "payment",
        success_url: `${req.protocol}://${req.get('host')}/?tour=${req.params.tourId}&user=${req.user.id}&price=${tour.price}`,
        cancel_url: `${req.protocol}://${req.get('host')}/tour.${tour.slug}`,
        customer_email: req.user.email,
        client_reference_id: req.params.tourId,
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: tour.name,
                        images: [tour.imageCover],
                    },
                    unit_amount: tour.price * 100,
                },
                quantity: 1
            }
        ]
    })
    // console.log(session);

    // Send it to client
    res.status(200).json({
        status: 'success',
        session
    })
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
    // This is only Temporary because it is unsecure
    const {tour, user, price} = req.query;
    if(!tour && !user && !price) return next();
    await Booking.create({tour, user, price});

    // using redirect
    res.redirect(req.originalUrl.split('?')[0]);
    next();
});

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBooking = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
