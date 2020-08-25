$(document).ready(loadGamemaster)

var gamemaster;
var list = [];

var cpm = [
	0.094,
	0.1351374318,
	0.16639787,
	0.192650919,
	0.21573247,
	0.2365726613,
	0.25572005,
	0.2735303812,
	0.29024988,
	0.3060573775,
	0.3210876,
	0.3354450362,
	0.34921268,
	0.3624577511,
	0.3752356,
	0.387592416,
	0.39956728,
	0.4111935514,
	0.4225,
	0.4329264091,
	0.44310755,
	0.4530599591,
	0.4627984,
	0.472336093,
	0.48168495,
	0.4908558003,
	0.49985844,
	0.508701765,
	0.51739395,
	0.5259425113,
	0.5343543,
	0.5426357375,
	0.5507927,
	0.5588305862,
	0.5667545,
	0.5745691333,
	0.5822789,
	0.5898879072,
	0.5974,
	0.6048236651,
	0.6121573,
	0.6194041216,
	0.6265671,
	0.6336491432,
	0.64065295,
	0.6475809666,
	0.65443563,
	0.6612192524,
	0.667934,
	0.6745818959,
	0.6811649,
	0.6876849038,
	0.69414365,
	0.70054287,
	0.7068842,
	0.7131691091,
	0.7193991,
	0.7255756136,
	0.7317,
	0.7347410093,
	0.7377695,
	0.7407855938,
	0.74378943,
	0.7467812109,
	0.74976104,
	0.7527290867,
	0.7556855,
	0.7586303683,
	0.76156384,
	0.7644860647,
	0.76739717,
	0.7702972656,
	0.7731865,
	0.7760649616,
	0.77893275,
	0.7817900548,
	0.784637,
	0.7874736075,
	0.7903
];

var spinner = '<div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>';

function loadGamemaster() {
	gamemaster = JSON.parse(localStorage.getItem("gamemaster"));

	if (!gamemaster) {
		downloadGamemaster();
		return;
	}

	list = [];
	gamemaster.forEach(function(p) {
		list.push(p.speciesName);
	});
	list.sort();
	$('#pokemon').typeahead({ source: list });
}

function downloadGamemaster() {
	var url = "https://raw.githubusercontent.com/pvpoke/pvpoke/master/src/data/gamemaster.json";
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			var gm = JSON.parse(xhr.responseText);
			localStorage.setItem("gamemaster", JSON.stringify(gm.pokemon)); loadGamemaster();
			loadGamemaster();
		}
	};
	xhr.open("GET", url);
	xhr.send();
}

$("form").submit(function(e) {
	e.preventDefault();
	let ivs = {
		atk: Number($("#attack").val()),
		def: Number($("#defense").val()),
		hp: Number($("#stamina").val())
	},
		pokemon = getPokemon($("#pokemon").val());

	$("#results").append(spinner);
	var spread = getIVSpread(pokemon);
	$("#results").empty();
	populateTable(spread, ivs);
});

function getPokemon(p) {
	var found;
	gamemaster.forEach(function(gm) {
		if (gm.speciesName === p) {
			found = gm;
			return;
		}
	});
	return found;
}

function getIVSpread(pokemon) {
	let spread = [];

	for (let atk = 0; atk < 16; atk++) {
		for (let def = 0; def < 16; def++) {
			for (let hp = 0; hp < 16; hp++) {
				for (let level = cpm.length-1; level >= 0; level--) {
					let data = {ivs: {atk, def, hp}, level, ...pokemon.baseStats};
					let calculated = cp(data);
					if (calculated.cp <= 1500) {
						spread.push({ivs: {atk, def, hp}, level, product: statProduct(calculated), ...calculated});
						break;
					}
				}
			}
		}
	}

	spread.sort(function(a, b) {
		return (a.product > b.product) ? -1 : 1;
	});
	return spread;
}

function cp(data) {
	let { atk, def, hp, level, ivs } = data;
	let attack = (atk + ivs.atk) * cpm[level],
		defense = (def + ivs.def) * cpm[level],
		stamina = (hp + ivs.hp) * cpm[level];

	var cp = Math.floor(attack * defense**0.5 * stamina**0.5 / 10);
	hp = Math.floor(stamina);
	cp = (cp < 10) ? 10 : cp;
	return { cp, attack, defense, hp };
}

function statProduct(data) {
	let { attack, defense, hp } = data;

	return attack * defense * hp;
}

function populateTable(spread, ivs) {
	$("#results").append($(`
		<h2>Results</h2>
		<table class="table">
			<thead>
				<tr>
					<th scope="col">Rank</th>
					<th scope="col">Level</th>
					<th scope="col">CP</th>
					<th scope="col">IVs</th>
					<th scope="col">Attack</th>
					<th scope="col">Defense</th>
					<th scope="col">HP</th>
					<th scope="col">Stat Product</th>
					<th scope="col">Percentage</th>
				</tr>
			</th>
		</table>
		`));
	let position, chosen;
	spread.forEach(function(s, i) {
		if (s.ivs.atk == ivs.atk && s.ivs.def == ivs.def && s.ivs.hp == ivs.hp) {
			position = i;
			chosen = s;
			return;
		}
	});

	$("#results table").append(getRow(position, chosen, spread[0], true));

	for (let i = 0; i < 25; i++) {
		$("#results table").append(getRow(i, spread[i], spread[0], false));
	}
}

function getRow(position, data, best, highlight) {
	let percentage = Math.trunc(100* (data.product / best.product * 100)) / 100;
	let tr = $("<tr></tr>");
	if (highlight) {
		if (percentage >= 99) {
			tr.addClass("bg-success");
		} else if (percentage >= 97) {
			tr.addClass("bg-info");
		} else if (percentage >= 95) {
			tr.addClass("bg-warning");
		} else {
			tr.addClass("bg-danger");
		}
	}
	tr.append("<td>" + (position + 1) + "</td>");
	tr.append("<td>" + ((data.level / 2) + 1) + "</td>");
	tr.append("<td>" + data.cp + "</td>");
	tr.append("<td>" + data.ivs.atk + "/" + data.ivs.def + "/" + data.ivs.hp + "</td>");
	tr.append("<td>" + data.attack + "</td>");
	tr.append("<td>" + data.defense + "</td>");
	tr.append("<td>" + data.hp + "</td>");
	tr.append("<td>" + data.product + "</td>");
	tr.append("<td>" + percentage + "%</td>");

	return tr;
}
