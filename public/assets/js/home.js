var budgetAvailable = {};

function getPeople() {
	fetch('/v2/people')
		.then(function (response) {
			return response.json();
		})
		.then(function (people) {
			people.map(disposePeople);
		});
}

function getPlayers() {
	fetch('/v2/players')
		.then(function (response) {
			return response.json();
		})
		.then(function (players) {
			players.map(disposePlayers);
		});
}

function disposePlayers(player) {

	let role = player.role;
	budgetAvailable[`${player.ownerName}`] = budgetAvailable[`${player.ownerName}`] - player.price;
	document.getElementById(`totale-${player.ownerName}`).innerHTML = budgetAvailable[`${player.ownerName}`];

	if(role == 'Portiere') {
		$(`#portieri-${player.ownerName}`).append(
			`
				<div class="row">
					<div class="col-md-2 col-sm-2 col-xs-2">
						<button class="btn" onclick="deletePlayer(this.id)" id="${player.playerName}">
    						<span class="glyphicon glyphicon-trash" style="color: lightgray;"></span>
  						</button>
					</div>
					<div class="col-md-7 col-sm-7 col-xs-7">
						<h5>${player.playerName}</h5>
					</div>
					<div class="col-md-3 col-sm-3 col-xs-3">
						<h5>${player.price}</h5>
					</div>
				</div>
			`
		);
	} else if(role == 'Difensore') {
		$(`#difensori-${player.ownerName}`).append(
			`
				<div class="row">
					<div class="col-md-2 col-sm-2 col-xs-2">
						<button class="btn" onclick="deletePlayer(this.id)" id="${player.playerName}">
    						<span class="glyphicon glyphicon-trash" style="color: lightgray;"></span>
  						</button>
					</div>
					<div class="col-md-7 col-sm-7 col-xs-7">
						<h5>${player.playerName}</h5>
					</div>
					<div class="col-md-3 col-sm-3 col-xs-3">
						<h5>${player.price}</h5>
					</div>
				</div>
			`
		);
	} else if(role == 'Centrocampista') {
		$(`#centrocampisti-${player.ownerName}`).append(
			`
				<div class="row">
					<div class="col-md-2 col-sm-2 col-xs-2">
						<button class="btn" onclick="deletePlayer(this.id)" id="${player.playerName}">
    						<span class="glyphicon glyphicon-trash" style="color: lightgray;"></span>
  						</button>
					</div>
					<div class="col-md-7 col-sm-7 col-xs-7">
						<h5>${player.playerName}</h5>
					</div>
					<div class="col-md-3 col-sm-3 col-xs-3">
						<h5>${player.price}</h5>
					</div>
				</div>
			`
		);
	} else if(role == 'Attaccante') {
		$(`#attaccanti-${player.ownerName}`).append(
			`
				<div class="row">
					<div class="col-md-2 col-sm-2 col-xs-2">
						<button class="btn" onclick="deletePlayer(this.id)" id="${player.playerName}">
    						<span class="glyphicon glyphicon-trash" style="color: lightgray;"></span>
  						</button>
					</div>
					<div class="col-md-7 col-sm-7 col-xs-7">
						<h5>${player.playerName}</h5>
					</div>
					<div class="col-md-3 col-sm-3 col-xs-3">
						<h5>${player.price}</h5>
					</div>
				</div>
			`
		);
	}
}

function disposePeople(person) {

	budgetAvailable[`${person.ownerName}`] = 500;

	$('#people-players').append(
		`
			<div class="col-md-3">
				<h1>${person.ownerName}</h1>
				<hr>
				<div id="portieri-${person.ownerName}">
					<h4 style="color: Orange;">Portieri</h4>
				</div>
				<hr>
				<div id="difensori-${person.ownerName}">
					<h4 style="color: MediumSeaGreen;">Difensori</h4>
				</div>
				<hr>
				<div id="centrocampisti-${person.ownerName}">
					<h4 style="color: DodgerBlue;">Centrocampisti</h4>
				</div>
				<hr>
				<div id="attaccanti-${person.ownerName}">
					<h4 style="color: Tomato;">Attaccanti</h4>
				</div>
				<hr>
				<div class="row">
					<div class= "col-md-9 col-sm-9 col-xs-9">
						<h4 style="color: gray">Totale</h4>
					</div>
					<div class="col-md-3 col-sm-3 col-xs-9">
						<h4 id="totale-${person.ownerName}">500</h4>
					</div>
				</div>
			</div>

		`
	);
}

function addPlayer() {
	var newPlayer = {
		playerName : document.getElementById('playerName').value,
		role : document.getElementById('roleSelector').value,
		price : document.getElementById('priceInput').value,
		ownerId : document.getElementById('ownerSelector').value
	};

	fetch('/v2/players', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newPlayer)
	}).then((response) => {
		response.text().then((text) => {
			alert(text);
		});
	});
	location.reload();
}

function deletePlayer(plName) {
	fetch(`/v2/players/${plName}`, {
		method: 'DELETE'
	}).then((response) => {
		response.text().then((text) => {
			alert(text);
		});
	});
	location.reload();
}


getPeople();
getPlayers();