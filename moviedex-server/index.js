let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let jsonParser = bodyParser.json();
let { DATABASE_URL, PORT } = require( './config' );
let {MoviesLista} = require('./model.js')
let app = express();
let uuid = require('uuid')

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
	if (req.method === "OPTIONS") {
		return res.send(204);
	}
	next();
});

/* Tu código va aquí */

app.get('/api/moviedex', (req, res)=>{
	MoviesLista.getAll()
		.then(movies=>{
			console.log(movies);
			return res.status(200).json(movies);
		})
		.catch(error=>{
			console.log(error);
			res.statusMessage = 'Error en la base de datos';
			return res.status(500).send();
		})
})



app.post('/api/moviedex', jsonParser, (req, res)=>{
	let id = uuid.v4();
	let title = req.body.title;
	let year = req.body.year;
	let rating = req.body.rating;

	if(title && year && rating){
		let obj = {id, title, year, rating};
		MoviesLista.addMovie(obj)
			.then(nuevo=>{
				console.log(nuevo);
				return res.status(201).json(nuevo);
			})
	}else{
		res.statusMessage = 'Campo(s) vacíos';
		return res.status(406).send();
	}
})



let server;

function runServer( port, databaseUrl ){
	return new Promise( (resolve, reject ) => {
		mongoose.connect( databaseUrl,  { useNewUrlParser: true, useUnifiedTopology: true  }, response => {
			if ( response ){
				return reject( response );
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then( () => {
			return new Promise( (resolve, reject) => {
				console.log( 'Closing the server' );
				server.close( err => {
					if ( err ){
						return reject( err );
					}
					else{
						resolve();
					}
				});
			});
		});
}
runServer( PORT, DATABASE_URL );

module.exports = { 
    app, 
    runServer, 
    closeServer 
}