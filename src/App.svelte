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
	<option value="Thieves Haven" />
	<option value="Chicken Isle" />
	<option value="Snake Island" />
	<option value="Devils Ridge" />
	<option value="Crooks Hollow" />
	<option value="Paradise Spring" />
	<option value="Old Salts Atoll" />Í
</datalist>
<main>
	<!--
	<header>
		<img src="Sotdle.png" alt="Sotdle" class="logo" />
		<br />
		<a href="https://github.com/AlexBurneikis/Sotdle">Github</a>
	</header>
-->
	<body>
		<img src={imgsrc} alt="island" />
		<br />
		<p>{guess1}</p>
		<p>{guess2}</p>
		<p>{guess3}</p>
		<p>{guess4}</p>
		<p>{guess5}</p>
		<p>{guess6}</p>
		<input bind:value={guess} list="options" />
		<br />
		<button on:click={guessButton}>Guess</button>
	</body>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		width: 240px;
		margin: 0 auto;
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
		margin-top: 5px;
		width: 240px;
		height: 25px;
		border-radius: 5px;
		margin-bottom: 5px;
	}
	button {
		margin-left: 90px;
		margin-right: 90px;
		width: 60px;
		height:30px;
		border-radius: 5px;
	}
</style>
