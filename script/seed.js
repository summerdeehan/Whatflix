'use strict'

const db = require('../server/db')
const {User, Genre} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const products = await Promise.all([
    Genre.create({"movieDBId": 28, "name": "Action"}),
    Genre.create({"movieDBId": 16, "name": "Animation"}),
    Genre.create({"movieDBId": 35, "name": "Comedy"}),
    Genre.create({"movieDBId": 80, "name": "Crime"}),
    Genre.create({"movieDBId": 14, "name": "Fantasy"}),
    Genre.create({"movieDBId": 10749, "name": "Romance"}),
    Genre.create({"movieDBId": 9648, "name": "Mystery"}),
    Genre.create({"movieDBId": 878,"name": "Science Fiction"}),
    Genre.create({"movieDBId": 53,"name": "Thriller"})
 ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
