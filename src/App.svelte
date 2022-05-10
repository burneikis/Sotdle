<script>
	import { onMount } from "svelte";
	let Islands = [];

	let answer;
	let imgsrc;

	let guessno = 1;
	let guess;

	let guessParagraph = ["", "", "", "", "", ""];
	let gpClass = ["", "", "", "", "", ""];

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

	function isWin(x) {
		return answer["Name"] === x;
	}

	function guessButton() {
		if (guessno <= 6) {
			if (isIsland(guess)) {
				if (isWin(guess)) {
					gpClass[guessno - 1] = 'win';
					guessParagraph[guessno - 1] = guess;
				}
				let guessIsland = getIsland(guess);
				guessno += 1;
			}
		}
	}
</script>

<datalist id="options">
	<option value="Cannon Cove" />
	<option value="Crescent Isle" />
	<option value="Lone Cove" />
	<option value="Mermaids Hideaway" />
	<option value="Sailors Bounty" />
	<option value="Smugglers Bay" />
	<option value="Wanderers Refuge" />
	<option value="Crooks Hollow" />
	<option value="Devils Ridge" />
	<option value="Discovery Ridge" />
	<option value="Plunder Valley" />
	<option value="Shark Bait Cove" />
	<option value="Snake Island" />
	<option value="Thieves Haven" />
	<option value="Krakens Fall" />
	<option value="Marauders Arch" />
	<option value="Old Faithful Isle" />
	<option value="Shipwreck Bay" />
	<option value="The Crooked Masts" />
	<option value="The Sunken Grove" />
	<option value="Ashen Reaches" />
	<option value="Fetchers Rest" />
	<option value="Flintlock Peninsula" />
	<option value="Rubys Fall" />
	<option value="The Devils Thirst" />
	<option value="Boulder Cay" />
	<option value="Lagoon of Whispers" />
	<option value="Lonely Isle" />
	<option value="Picaroon Palms" />
	<option value="Rapier Cay" />
	<option value="Rum Runner Isle" />
	<option value="Salty Sands" />
	<option value="Sandy Shallows" />
	<option value="Sea Dogs Rest" />
	<option value="Twin Groves" />
	<option value="Barnacle Cay" />
	<option value="Booty Isle" />
	<option value="Castaway Isle" />
	<option value="Chicken Isle" />
	<option value="Cutlass Cay" />
	<option value="Fools Lagoon" />
	<option value="Lookout Point" />
	<option value="Mutineer Rock" />
	<option value="Old Salts Atoll" />
	<option value="Paradise Spring" />
	<option value="Black Sand Atoll" />
	<option value="Black Water Enclave" />
	<option value="Blind Mans Lagoon" />
	<option value="Isle of Last Words" />
	<option value="Liars Backbone" />
	<option value="Plunderers Plight" />
	<option value="Scurvy Isley" />
	<option value="Shark Tooth Key" />
	<option value="Shiver Retreat" />
	<option value="Tri Rock Isle" />
	<option value="Brimstone Rock" />
	<option value="Cinder Islet" />
	<option value="Cursewater Shores" />
	<option value="Flames End" />
	<option value="Forsaken Brink" />
	<option value="Glowstone Cay" />
	<option value="Magmas Tide" />
	<option value="Roaring Sands" />
	<option value="Scorched Pass" />
	<option value="Keel Haul Fort" />
	<option value="Hidden Spring Keep" />
	<option value="Sailors Knot Stronghold" />
	<option value="Lost Gold Fort" />
	<option value="Fort of The Damned" />
	<option value="The Crows Nest Fortress" />
	<option value="Skull Keep" />
	<option value="Kraken Watchtower" />
	<option value="Shark Fin Camp" />
	<option value="Molten Sands Fortress" />
	<option value="Sanctuary Outpost" />
	<option value="Golden Sands Outpost" />
	<option value="Plunder Outpost" />
	<option value="Ancient Spire Outpost" />
	<option value="Galleons Grave Outpost" />
	<option value="Dagger Tooth Outpost" />
	<option value="Morrows Peak Outpost" />Í
</datalist>
<main>
	<header>
		<img class="logo" src="Sotdle.png" alt="Sotdle" />
	</header>
	<body>
		<img src={imgsrc} alt="island" />
		<br />
		<p class={gpClass[0]}>{guessParagraph[0]}</p>
		<p class={gpClass[1]}>{guessParagraph[1]}</p>
		<p class={gpClass[2]}>{guessParagraph[2]}</p>
		<p class={gpClass[3]}>{guessParagraph[3]}</p>
		<p class={gpClass[4]}>{guessParagraph[4]}</p>
		<p class={gpClass[5]}>{guessParagraph[5]}</p>
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
		height: 30px;
		border-radius: 5px;
	}
	.win {
		color: greenyellow;
	}
</style>
