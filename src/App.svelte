<script>
	import { onMount } from "svelte";
	let Islands = [];

	let answer;
	let imgsrc;

	let guessno;
	let guess;

	export let guess1;
	export let guess2;
	export let guess3;
	export let guess4;
	export let guess5;
	export let guess6;

	function setup() {
		answer = Islands[Math.floor(Math.random() * Islands.length)];
		imgsrc = answer.Image;
		guessno = 1;
	}

	function loadIslands() {
		fetch("islands.json").then((res) => {
			res.json().then((data) => {
				Islands = data;
				setup();
			});
		});
	}
	onMount(async () => {
		loadIslands();
	});

	function isIsland(x) {
		if (Islands.find((i) => i.Name === x)) {
			return true;
		}
		return false;
	}
	function getIsland(x) {
		return Islands.find((i) => i.Name === x);
	}

	function guessButton() {
		if (guessno <= 6) {
			if (isIsland(guess)) {
				let guessIsland = getIsland(guess);
				guessno += 1;
			}
		}
	}
</script>

<datalist id="options">
	<option value="Cannon Cove"></option>
<option value="Crescent Isle"></option>
<option value="Lone Cove"></option>
<option value="Mermaids Hideaway"></option>
<option value="Sailors Bounty"></option>
<option value="Smugglers Bay"></option>
<option value="Wanderers Refuge"></option>
<option value="Crooks Hollow"></option>
<option value="Devils Ridge"></option>
<option value="Discovery Ridge"></option>
<option value="Plunder Valley"></option>
<option value="Shark Bait Cove"></option>
<option value="Snake Island"></option>
<option value="Thieves Haven"></option>
<option value="Krakens Fall"></option>
<option value="Marauders Arch"></option>
<option value="Old Faithful Isle"></option>
<option value="Shipwreck Bay"></option>
<option value="The Crooked Masts"></option>
<option value="The Sunken Grove"></option>
<option value="Ashen Reaches"></option>
<option value="Fetchers Rest"></option>
<option value="Flintlock Peninsula"></option>
<option value="Rubys Fall"></option>
<option value="The Devils Thirst"></option>
<option value="Boulder Cay"></option>
<option value="Lagoon of Whispers"></option>
<option value="Lonely Isle"></option>
<option value="Picaroon Palms"></option>
<option value="Rapier Cay"></option>
<option value="Rum Runner Isle"></option>
<option value="Salty Sands"></option>
<option value="Sandy Shallows"></option>
<option value="Sea Dogs Rest"></option>
<option value="Twin Groves"></option>
<option value="Barnacle Cay"></option>
<option value="Booty Isle"></option>
<option value="Castaway Isle"></option>
<option value="Chicken Isle"></option>
<option value="Cutlass Cay"></option>
<option value="Fools Lagoon"></option>
<option value="Lookout Point"></option>
<option value="Mutineer Rock"></option>
<option value="Old Salts Atoll"></option>
<option value="Paradise Spring"></option>
<option value="Black Sand Atoll"></option>
<option value="Black Water Enclave"></option>
<option value="Blind Mans Lagoon"></option>
<option value="Isle of Last Words"></option>
<option value="Liars Backbone"></option>
<option value="Plunderers Plight"></option>
<option value="Scurvy Isley"></option>
<option value="Shark Tooth Key"></option>
<option value="Shiver Retreat"></option>
<option value="Tri Rock Isle"></option>
<option value="Brimstone Rock"></option>
<option value="Cinder Islet"></option>
<option value="Cursewater Shores"></option>
<option value="Flames End"></option>
<option value="Forsaken Brink"></option>
<option value="Glowstone Cay"></option>
<option value="Magmas Tide"></option>
<option value="Roaring Sands"></option>
<option value="Scorched Pass"></option>
<option value="Keel Haul Fort"></option>
<option value="Hidden Spring Keep"></option>
<option value="Sailors Knot Stronghold"></option>
<option value="Lost Gold Fort"></option>
<option value="Fort of The Damned"></option>
<option value="The Crows Nest Fortress"></option>
<option value="Skull Keep"></option>
<option value="Kraken Watchtower"></option>
<option value="Shark Fin Camp"></option>
<option value="Molten Sands Fortress"></option>
<option value="Sanctuary Outpost"></option>
<option value="Golden Sands Outpost"></option>
<option value="Plunder Outpost"></option>
<option value="Ancient Spire Outpost"></option>
<option value="Galleons Grave Outpost"></option>
<option value="Dagger Tooth Outpost"></option>
<option value="Morrows Peak Outpost"></option>Í
</datalist>
<main>
	<header>
		<img class="logo" src="Sotdle.png" alt="Sotdle"/>
	</header>
	<body>
		<img src={imgsrc} alt="island" />
		<br />
		<p>{guess1}</p>
		<p>{guess2}</p>
		<p>{guess3}</p>
		<p>{guess4}</p>
		<p>{guess5}</p>
		<p>{guess6}</p>
		<div class="input">
		<input bind:value={guess} list="options" />
		<button on:click={guessButton}>Guess</button>
	</div>
	</body>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		width: 240px;
		margin: 0 auto;
	}
	header {
		height: 50px;
	}
	.logo {
		height: 50px;
		width: auto;
	}
	.input {
		width: 240px;
	}
	p {
		margin-top: 0;
		margin-bottom: 5px;
		background-color: white;
		width: 240px;
		height: 25px;
		border-radius: 5px;
	}
	img {
		width: 240px;
	}
	input {
		margin: 0px;
		margin-top: 5px;
		width: 175px;
		height: 30px;
		border-radius: 5px;
	}
	button {
		padding: 0;
		margin: 0px;
		margin-top: 5px;
		width: 60px;
		height:30px;
		border-radius: 5px;
	}
</style>
