<script>
	import { onMount } from "svelte";
	let Islands = [];
	let guess;
	let answer;
	let guessno;
	let imgsrc;

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
	<option value="Thieves Haven" /><option value="Chicken Isle" /><option
		value="Snake Island"
	/><option value="Devils Ridge" /><option value="Crooks Hollow" /><option
		value="Paradise Spring"
	/><option value="Old Salts Atoll" />
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
		<input bind:value={guess} list="options" />
		<br />
		<button on:click={guessButton}>Guess</button>
	</body>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	img {
		max-height: 240px;
	}
</style>
