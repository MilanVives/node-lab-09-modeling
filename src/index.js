// Run with: npm start (needs a MongoDB: local or set MONGODB_URI)
const mongoose = require('mongoose');
const { createMovie, addReview, getAverageRating } = require('./movies');

async function main() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/movies');
  console.log('Connected to MongoDB');
  const movie = await createMovie('Inception', 'Sci-Fi', 2010, { reviewer: 'Milan', rating: 5, comment: 'Mind-blowing!' });
  await addReview(movie._id, { reviewer: 'Lien', rating: 4, comment: 'Great visuals' });
  console.log(`Average rating: ${(await getAverageRating(movie._id)).toFixed(1)}`);
  await mongoose.disconnect();
}

main().catch((err) => { console.error(err.message); process.exit(1); });
