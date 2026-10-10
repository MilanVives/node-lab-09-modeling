# Lab 09: Mongoose Modeling

Model a movie review database with embedded documents and work with arrays of subdocuments.

## Getting started

```bash
npm install
npm test
```

`npm test` runs the same checks as the autograder, against a temporary in-memory MongoDB. Run a single requirement with `npm test -- --test-name-pattern="^R1:"`. `npm start` runs a small demo against your own database (local MongoDB or `MONGODB_URI`).

All code goes in `src/movies.js`. The schemas are given: reviews are **embedded** in a movie (`reviews: [reviewSchema]`). Do not change the schemas.

## Requirements

### R1: createMovie saves a movie with an embedded review
**2 points**

`createMovie(title, genre, year, firstReview)` creates and saves a movie that already contains `firstReview` in its `reviews` array, and returns the saved movie.

### R2: addReview adds a review to a movie
**2 points**

`addReview(movieId, review)` finds the movie, pushes the review onto `movie.reviews` and saves the movie (the parent document).

### R3: updateReview changes one review
**2 points**

`updateReview(movieId, reviewId, newRating, newComment)` finds the review with `movie.reviews.id(reviewId)`, changes `rating` and `comment`, and saves the movie.

### R4: removeReview deletes one review
**1 point**

`removeReview(movieId, reviewId)` removes the review with `movie.reviews.pull(reviewId)` and saves the movie.

### R5: getTopRated finds movies with a 5-star review
**2 points**

`getTopRated()` returns all movies that have at least one review with rating 5. Query with dot notation: `{ 'reviews.rating': 5 }`.

### R6: getAverageRating computes the average rating
**1 point**

`getAverageRating(movieId)` fetches the movie and returns the average rating of its reviews, computed in JavaScript. Return `0` when the movie has no reviews.

## Submitting

Commit your work and run `npm run submit`. Your score and feedback appear under **Releases** after a few minutes. You can submit as often as you like; the latest submission counts.
