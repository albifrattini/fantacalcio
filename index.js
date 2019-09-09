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
				table.increments().primary();
				table.string('ownerName');
				table.integer('ownerId');
			})
			.then(function() {
				return dbConnection('people').insert(peopleList);
			});
		}
	});
}

function initPlayers() {
	let playersList = require('./other/initPlayers.json');

	return dbConnection.schema.hasTable('players').then(exists => {
		if(!exists) {
			dbConnection.schema.createTable('players', table => {
				table.increments().primary();
				table.string('playerName');
				table.integer('ownerId');
				table.integer('price');
				table.enum('role', ['Portiere', 'Difensore', 'Centrocampista', 'Attaccante']);
			})
			.then(function() {
				return dbConnection('players').insert(playersList);
			});
		} 
	})
}








app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));






app.get('/v2/people', (request, response) => {
	let allPeople = dbConnection('people');
	allPeople.then(result => {
		response.json(result);
	});
});

app.get('/v2/players', (request, response) => {
	let allPlayers = dbConnection('players');
	allPlayers = allPlayers.join('people', 'players.ownerId', 'people.ownerId');
	allPlayers.then(result => {
		response.json(result);
	});
});

app.post('/v2/players', (request, response) => {
	let newPlayer = {
		playerName : request.body.playerName,
		ownerId : parseInt(request.body.ownerId),
		price : parseInt(request.body.price),
		role : request.body.role,
	};
	dbConnection('players').insert(newPlayer).then(result => {
		response.send(`${newPlayer.playerName} inserito!`);
	});
});

app.delete('/v2/players/:name', (request, response) => {
	let deletedPlayer = request.params.name;
	dbConnection('players').where('playerName', deletedPlayer).del().then((_) => {
		response.send(`${deletedPlayer} è stato eliminato!`);
	});
});







initDb();

app.listen(
	serverPort,
		() => {
			console.log(`Application listening on port ${serverPort}...`);
		}
);
