const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const sqlDbFactory = require('knex');
const environment = process.env.NODE_ENV || 'development';
const conf = {
		development: {
	    	client: 'pg',
	    	connection: 'postgres://localhost/fantacalcio'
	  	},
	  	production: {
		  	debug: true,
		    client: 'pg',
		    connection: process.env.DATABASE_URL,
		    ssl: true
	  	}
	}
const envConfig = conf[environment];
const dbConnection = sqlDbFactory(envConfig);
const serverPort = process.env.PORT || 3000;












function initDb() {
	initPeople();
	initPlayers();
}

function initPeople() {
	let peopleList = require('./other/peopleList.json');

	return dbConnection.schema.hasTable('people').then(exists => {
		if(!exists) {
			dbConnection.schema.createTable('people', table => {
				table.increments();
				table.string('name');
				table.integer('ownerId');
			})
			.then(function() {
				return dbConnection('people').insert(peopleList);
			});
		}
	});
}

function initPlayers() {

	return dbConnection.schema.hasTable('players').then(exists => {
		if(!exists) {
			dbConnection.schema.createTable('players', table => {
				table.increments();
				table.string('name');
				table.string('ownerId').references('ownerId').inTable('people');
				table.integer('price');
				table.enum('role', ['Portiere', 'Difensore', 'Centrocampista', 'Attaccante']);
			});
		} 
	})
}









app.get('/', (request, response) => {
	
});

app.get('/players', (request, response) => {

});

app.get('/players/:id', (request, response) => {

});

app.post('/players/:id', (request, response) => {

});

app.delete('/players/:id', (request, response) => {

});










app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

initDb();

app.listen(
	serverPort,
		() => {
			console.log(`Application listening on port ${serverPort}...`);
		}
);
