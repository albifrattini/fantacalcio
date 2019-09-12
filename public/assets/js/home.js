var budgetAvailable = {};
var playersAvailable = {};
var clearFx = 0;

function getData() {
	fetch('/v2/people')
		.then(function (response) {
			return response.json();
		})
		.then(function (people) {
			people.map(disposePeople);
			fetch('/v2/players')
				.then(function (response) {
					return response.json();
				})
				.then(function (players) {
					players.map(disposePlayers);
				});
		});
}

function disposePlayers(player) {

	let role = player.role;
	budgetAvailable[`${player.ownerName}`] = budgetAvailable[`${player.ownerName}`] - player.price;
	document.getElementById(`totale-${player.ownerName}`).innerHTML = budgetAvailable[`${player.ownerName}`];

	if(role == 'Portiere') {
		playersAvailable[`${player.ownerName}`][0] = playersAvailable[`${player.ownerName}`][0] - 1;
		document.getElementById(`portieri-disponibile-${player.ownerName}`).innerHTML = 'Portieri  (' + playersAvailable[`${player.ownerName}`][0] + ')';
		$(`#portieri-${player.ownerName}`).append(
			`
				<div class="row">
					<div class="col-md-2 col-sm-2 col-xs-2">
						<button class="deleteButton" ondblclick="deletePlayer(this.id)" id="${player.playerName}">
    						<span class="glyphicon glyphicon-trash"></span>
  						</button>
					</div>
					<div class="col-md-8 col-sm-8 col-xs-8">
						<h5>${player.playerName}</h5>
					</div>
					<div class="col-md-2 col-sm-2 col-xs-2">
						<h5>${player.price}</h5>
					</div>
				</div>
			`
		);
	} else if(role == 'Difensore') {
		playersAvailable[`${player.ownerName}`][1] = playersAvailable[`${player.ownerName}`][1] - 1;
		document.getElementById(`difensori-disponibile-${player.ownerName}`).innerHTML = 'Difensori  (' + playersAvailable[`${player.ownerName}`][1] + ')';
		$(`#difensori-${player.ownerName}`).append(
			`
				<div class="row">
					<div class="col-md-2 col-sm-2 col-xs-2">
						<button class="deleteButton" ondblclick="deletePlayer(this.id)" id="${player.playerName}">
    						<span class="glyphicon glyphicon-trash"></span>
  						</button>
					</div>
					<div class="col-md-8 col-sm-8 col-xs-8">
						<h5>${player.playerName}</h5>
					</div>
					<div class="col-md-2 col-sm-2 col-xs-2">
						<h5>${player.price}</h5>
					</div>
				</div>
			`
		);
	} else if(role == 'Centrocampista') {
		playersAvailable[`${player.ownerName}`][2] = playersAvailable[`${player.ownerName}`][2] - 1;
		document.getElementById(`centrocampisti-disponibile-${player.ownerName}`).innerHTML = 'Centrocampisti  (' + playersAvailable[`${player.ownerName}`][2] + ')';
		$(`#centrocampisti-${player.ownerName}`).append(
			`
				<div class="row">
					<div class="col-md-2 col-sm-2 col-xs-2">
						<button class="deleteButton" ondblclick="deletePlayer(this.id)" id="${player.playerName}">
    						<span class="glyphicon glyphicon-trash"></span>
  						</button>
					</div>
					<div class="col-md-8 col-sm-8 col-xs-8">
						<h5>${player.playerName}</h5>
					</div>
					<div class="col-md-2 col-sm-2 col-xs-2">
						<h5>${player.price}</h5>
					</div>
				</div>
			`
		);
	} else if(role == 'Attaccante') {
		playersAvailable[`${player.ownerName}`][3] = playersAvailable[`${player.ownerName}`][3] - 1;
		document.getElementById(`attaccanti-disponibile-${player.ownerName}`).innerHTML = 'Attaccanti  (' + playersAvailable[`${player.ownerName}`][3] + ')';
		$(`#attaccanti-${player.ownerName}`).append(
			`
				<div class="row">
					<div class="col-md-2 col-sm-2 col-xs-2">
						<button class="deleteButton" ondblclick="deletePlayer(this.id)" id="${player.playerName}">
    						<span class="glyphicon glyphicon-trash"></span>
  						</button>
					</div>
					<div class="col-md-8 col-sm-8 col-xs-8">
						<h5>${player.playerName}</h5>
					</div>
					<div class="col-md-2 col-sm-2 col-xs-2">
						<h5>${player.price}</h5>
					</div>
				</div>
			`
		);
	}
}

function disposePeople(person) {

	budgetAvailable[`${person.ownerName}`] = 500;
	playersAvailable[`${person.ownerName}`] = [3,8,8,6];
	
	if(clearFx % 3 == 0 && clearFx != 0) {
		$('#people-players').append(
			'<div class="clearfix"></div>'
		);
	}

	clearFx++;


	$('#people-players').append(
		`
			<div class="col-md-4" style="padding: 20px;">
				<div class="polaroid" style="padding: 20px;">
					<h1 style="color: #444444">${person.ownerName}</h1>
					<div style="height: 30px;"></div>
					<div class="row">
						<div class="col-md-10 col-sm-10 col-xs-10">
							<div>
								<h4 style="color: Orange;" id="portieri-disponibile-${person.ownerName}">Portieri  (${playersAvailable[`${person.ownerName}`][0]})</h4>
							</div>
						</div>
					</div>
					<div id="portieri-${person.ownerName}"></div>
					<div class="row">
						<div class="col-md-10 col-sm-10 col-xs-10">
							<div>
								<h4 style="color: MediumSeaGreen;" id="difensori-disponibile-${person.ownerName}">Difensori  (${playersAvailable[`${person.ownerName}`][1]})</h4>
							</div>
						</div>
					</div>
					<div id="difensori-${person.ownerName}"></div>
					<div class="row">
						<div class="col-md-10 col-sm-10 col-xs-10">
							<div>
								<h4 style="color: DodgerBlue;" id="centrocampisti-disponibile-${person.ownerName}">Centrocampisti  (${playersAvailable[`${person.ownerName}`][2]})</h4>
							</div>
						</div>
					</div>
					<div id="centrocampisti-${person.ownerName}"></div>
					<div class="row">
						<div class="col-md-10 col-sm-10 col-xs-10">
							<div>
								<h4 style="color: Tomato;" id="attaccanti-disponibile-${person.ownerName}">Attaccanti  (${playersAvailable[`${person.ownerName}`][3]})</h4>
							</div>
						</div>
					</div>
					<div id="attaccanti-${person.ownerName}"></div>
					<div style="height: 30px;"></div>
					<hr>
					<div class="row">
						<div class= "col-md-10 col-sm-10 col-xs-10">
							<h5 style="color: gray">Disponibile</h5>
						</div>
						<div class="col-md-2 col-sm-2 col-xs-10">
							<h4 id="totale-${person.ownerName}">500</h4>
						</div>
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

getData();