const mongoose = require('mongoose');

// Given schemas: do not change them, only implement the functions below.
const reviewSchema = new mongoose.Schema({
  reviewer: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
  date: { type: Date, default: Date.now },
});

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: String,
  year: Number,
  reviews: [reviewSchema],
});

const Movie = mongoose.model('Movie', movieSchema);

// Every function returns the saved movie (or the result asked for).

async function createMovie(title, genre, year, firstReview) {
  // TODO R1: create and save a movie with firstReview already embedded
}

async function addReview(movieId, review) {
  // TODO R2: find the movie, push the review, save
}

async function updateReview(movieId, reviewId, newRating, newComment) {
  // TODO R3: find the movie, find the review with movie.reviews.id(reviewId), update fields, save
}

async function removeReview(movieId, reviewId) {
  // TODO R4: find the movie, movie.reviews.pull(reviewId), save
}

async function getTopRated() {
  // TODO R5: all movies with at least one review with rating 5 (dot notation: 'reviews.rating')
}

async function getAverageRating(movieId) {
  // TODO R6: fetch the movie and compute the average rating in JavaScript; 0 when there are no reviews
}

module.exports = { Movie, createMovie, addReview, updateReview, removeReview, getTopRated, getAverageRating };
