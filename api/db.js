const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json', {
    defaultValue: {
        movies: [
            { id: 1, title: 'asfd1', imageUrl: '', imdbRating: 4.5, genre: 'Comedy' },
            { id: 2, title: 'asfd2', imageUrl: '', imdbRating: 2.5, genre: 'Fantasy' },
            { id: 3, title: 'asfd3', imageUrl: '', imdbRating: 5.5, genre: 'Crime' },
            { id: 4, title: 'asfd4', imageUrl: '', imdbRating: 1.5, genre: 'Drama' },
            { id: 5, title: 'asfd5', imageUrl: '', imdbRating: 2.5, genre: 'Adventure' },
        ],
        users: [
            {
                id: 1, username: 'test123', 
                password: '$2b$10$uCxD4SqlR0AiMWAUYAVU3eYe05R.qUWzTG3ZvpMDGln0fopJFZlM2', 
                recentMovies: [

                ],
                recommendedMovies: [
                    { id: 1, title: 'asfd3', imageUrl: '', imdbRating: 5.5, genre: 'Crime' },
                    { id: 2, title: 'asfd4', imageUrl: '', imdbRating: 1.5, genre: 'Drama' },
                    { id: 3, title: 'asfd5', imageUrl: '', imdbRating: 2.5, genre: 'Adventure' },
                ]
            }
        ],
    }
});
const db = low(adapter)

module.exports = db;

// // Set some defaults
// db.defaults({ movies: [],  })
//   .write()
 
// // Add a post
// db.get('posts')
//   .push({ id: 1, title: 'lowdb is awesome'})
//   .write()

// const bcrypt = require('bcrypt');
// let hash;
// bcrypt.hash('password123', 10).then( hashh => {
//     hash = hashh;
//     console.log(hash)
//     bcrypt.compare('password123', hash).then(function(result) {
//         console.log(result)
//      });
// });

// const userObj = db.get('users').find({username: 'test123'}).value();
// console.log(userObj)