const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json', {
    defaultValue: {
        movies: [
            { title: 'asfd1', imageUrl: '', imdbRating: 4.5, genre: 'Comedy' },
            { title: 'asfd2', imageUrl: '', imdbRating: 2.5, genre: 'Fantasy' },
            { title: 'asfd3', imageUrl: '', imdbRating: 5.5, genre: 'Crime' },
            { title: 'asfd4', imageUrl: '', imdbRating: 1.5, genre: 'Drama' },
            { title: 'asfd5', imageUrl: '', imdbRating: 2.5, genre: 'Adventure' },
            
        ],
        recentMovies: [

        ],
        recommendedMovies: [

        ]
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