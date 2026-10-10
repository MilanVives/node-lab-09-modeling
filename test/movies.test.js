const { describe, it, before, after, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const db = require('./helpers/db');
const m = require('../src/movies');

before(db.connect);
after(db.disconnect);
beforeEach(db.clear);

async function inception() {
  const movie = await m.createMovie('Inception', 'Sci-Fi', 2010, { reviewer: 'Milan', rating: 5, comment: 'Mind-blowing!' });
  assert.ok(movie && movie._id, 'createMovie should return the saved movie');
  return movie;
}

describe('R1: createMovie saves a movie with an embedded review', () => {
  it('stores the movie with one review', async () => {
    const movie = await inception();
    const stored = await m.Movie.findById(movie._id);
    assert.equal(stored.title, 'Inception');
    assert.equal(stored.reviews.length, 1, 'The movie should be created with its first review embedded');
    assert.equal(stored.reviews[0].reviewer, 'Milan');
  });
});

describe('R2: addReview adds a review to a movie', () => {
  it('pushes the review and saves', async () => {
    const movie = await inception();
    await m.addReview(movie._id, { reviewer: 'Lien', rating: 4, comment: 'Great visuals' });
    const stored = await m.Movie.findById(movie._id);
    assert.deepEqual(stored.reviews.map((r) => r.reviewer), ['Milan', 'Lien'], 'addReview should add the review to the reviews array and save the movie');
  });
});

describe('R3: updateReview changes one review', () => {
  it('updates rating and comment of the given review', async () => {
    const movie = await inception();
    const reviewId = movie.reviews[0]._id;
    await m.updateReview(movie._id, reviewId, 3, 'Good but overrated');
    const review = (await m.Movie.findById(movie._id)).reviews.id(reviewId);
    assert.equal(review.rating, 3, 'updateReview should change the rating');
    assert.equal(review.comment, 'Good but overrated', 'updateReview should change the comment');
  });
});

describe('R4: removeReview deletes one review', () => {
  it('removes the review from the array', async () => {
    const movie = await inception();
    await m.addReview(movie._id, { reviewer: 'Lien', rating: 4 });
    await m.removeReview(movie._id, movie.reviews[0]._id);
    const stored = await m.Movie.findById(movie._id);
    assert.deepEqual(stored.reviews.map((r) => r.reviewer), ['Lien'], 'removeReview should remove only the given review');
  });
});

describe('R5: getTopRated finds movies with a 5-star review', () => {
  it('returns only movies that have at least one rating of 5', async () => {
    await inception();
    await m.createMovie('Cats', 'Musical', 2019, { reviewer: 'Lien', rating: 1 });
    const result = await m.getTopRated();
    assert.ok(Array.isArray(result), 'getTopRated should return an array of movies');
    assert.deepEqual(result.map((x) => x.title), ['Inception'], 'getTopRated should return movies with a review rating of 5');
  });
});

describe('R6: getAverageRating computes the average rating', () => {
  it('averages the ratings and returns 0 without reviews', async () => {
    const movie = await inception();
    await m.addReview(movie._id, { reviewer: 'Lien', rating: 4 });
    assert.equal(await m.getAverageRating(movie._id), 4.5, 'The average of 5 and 4 should be 4.5');
    const stored = await m.Movie.findById(movie._id);
    stored.reviews = [];
    await stored.save();
    assert.equal(await m.getAverageRating(movie._id), 0, 'A movie without reviews should have average 0');
  });
});
