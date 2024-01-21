const mongoose = require('mongoose');
const Tour = require('./../models/tourModel');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review can not be empty!']
    },
    rating: {
        type: Number,
        min: 1, 
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tour: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'Review must belong to a tour']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user']
    }
}, 
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });

reviewSchema.index({tour: 1, user: 1}, {unique: true});

reviewSchema.pre(/^find/, function(next) {
this.populate({
    path: 'user',
    select: 'name photo'
})
next();
// this.populate({
//     path: 'tour',
//     select: 'name'
// }).populate({
//     path: 'user',
//     select: 'name photo'
// })
})

reviewSchema.statics.calcAverageRatings = async function(tourId) {
    const stats = await this.aggregate([
        {
            $match: {tour: tourId}
        },
        {
            $group: {
                _id: '$tour',
                nRating: {$sum: 1},
                avgRating: {$avg: '$rating'}
            }
        }
    ]);
    // console.log(stats);
    if(stats.length > 0) {
        await Tour.findByIdAndUpdate(tourId, {
            ratingsQuantity: stats[0].nRating,
            ratingsAverage: stats[0].avgRating
        })
    } else {
        await Tour.findByIdAndUpdate(tourId, {
            ratingsQuantity: 0,
            ratingsAverage: 4.5
        }) 
    }
}

reviewSchema.post('save', function() {
    // this points to current review
    this.constructor.calcAverageRatings(this.tour);
    // post does not have access to next();
})

// findByIdAndUpdate
// findByIdAndDelete
reviewSchema.pre(/^findOneAnd/, async function(next) {
    // TRICK TO PASS r 
    this.r = this.findOne();
    // const r = await this.findOne();
    // console.log(r);
    next();
})

reviewSchema.post(/^findOneAnd/, async function(next) {
    // await this.findOne(); does not work here, query has already executed
    await this.r.constructor.calcAverageRatings(this.r.tour);
    this.r = this.findOne();
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

//  POST  /tour/1431241234/reviews
//  GET  /tour/1431241234/reviews
//  GET  /tour/1431241234/reviews/4195172
