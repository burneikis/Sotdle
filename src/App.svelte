<script>
	import { onMount } from "svelte";
	export let guess1;
	export let guess2;
	export let guess3;
	export let guess4;
	export let guess5;
	export let guess6;
	export let g1c;
	export let g2c;
	export let g3c;
	export let g4c;
	export let g5c;
	export let g6c;

	let Islands = [];

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
</script>

<main>
	<header>
		<img src="Sotdle.png" alt="Sotdle" class="logo" />
		<br />
		<a href="https://github.com/AlexBurneikis/Sotdle">Github</a>
		<br />
		<img class="img" src={imgsrc} alt="island" />
	</header>
	<body>
		<input list="options" />
		<datalist id="options">
			<option value="Thieves Haven" /><option
				value="Chicken Isle"
			/><option value="Snake Island" /><option
				value="Devils Ridge"
			/><option value="Crooks Hollow" /><option
				value="Paradise Spring"
			/><option value="Old Salts Atoll" />
		</datalist>
		<p class={g1c}>{guess1}</p>
		<p class={g2c}>{guess2}</p>
		<p class={g3c}>{guess3}</p>
		<p class={g4c}>{guess4}</p>
		<p class={g5c}>{guess5}</p>
		<p class={g6c}>{guess6}</p>
	</body>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	
	input {
		border-radius: 5px;
	}

	p {
		color: black;
		font-size: large;
		font-weight: 100;
	}
	.logo {
		width: 70px;
	}

	.img {
		max-height: 240px;
	}

	.correct {
		color: greenyellow;
	}

	.close {
		color: yellow;
	}

	.wrong {
		color: black;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
