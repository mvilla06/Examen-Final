let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );

mongoose.Promise = global.Promise;

/* Tu código va aquí */
let Movie = mongoose.Schema({
    film_ID:String,
    film_title:String,
    year:Number,
    rating:Number
})


let Movies = mongoose.model('movies', Movie, 'movies');

let MoviesLista = {
    getAll: function(){
        return Movies.find().then(resultado=>{
            return resultado;
        })
        .catch(error=>{
            throw error;
        })
    },
    addMovie: function(obj){
        return Movies.create({
            film_ID:obj.id,
            film_title: obj.title,
            year:obj.year,
            rating:obj.rating
         })
         .then(nuevo=>{
             return nuevo;
         })
         .catch(error=>{
             throw error;
         })
    }
}


module.exports = {
    MoviesLista
};