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

				var list = document.getElementById("options");
				Islands.forEach(function (item) {
					var option = document.createElement("option");
					option.value = item["Name"];
					list.appendChild(option);
				});

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

	function is_same_region(x) {
		return answer["Region"] === x["Region"];
	}

	function direction(x) {
		var direction;

		if (answer["LocationY"] - x["LocationY"] < 0) {
			direction = "N";

			if (
				answer["LocationX"].charCodeAt(0) -
					x["LocationX"].charCodeAt(0) >
				0
			) {
				direction += "E";
			} else if (
				answer["LocationX"].charCodeAt(0) -
					x["LocationX"].charCodeAt(0) <
				0
			) {
				direction += "W";
			}
		} else if (answer["LocationY"] - x["LocationY"] > 0) {
			direction = "S";

			if (
				answer["LocationX"].charCodeAt(0) -
					x["LocationX"].charCodeAt(0) >
				0
			) {
				direction += "E";
			} else if (
				answer["LocationX"].charCodeAt(0) -
					x["LocationX"].charCodeAt(0) <
				0
			) {
				direction += "W";
			}
		}
		if (answer["LocationY"] === x["LocationY"]) {
			if (
				answer["LocationX"].charCodeAt(0) -
					x["LocationX"].charCodeAt(0) >
				0
			) {
				direction = "E";
			} else if (
				answer["LocationX"].charCodeAt(0) -
					x["LocationX"].charCodeAt(0) <
				0
			) {
				direction = "W";
			}
		}

		return direction;
	}

	function guessButton() {
		if (guessno <= 6) {
			if (isIsland(guess)) {
				if (isWin(guess)) {
					gpClass[guessno - 1] = "win";
					guessParagraph[guessno - 1] = guess;
					guessno = 7;
					return;
				}

				let guessIsland = getIsland(guess);

				if (is_same_region(guessIsland)) {
					gpClass[guessno - 1] = "close";
				}

				const index = Islands.indexOf(guessIsland);
				Islands.splice(index, 1);

				var list = document.getElementById("options");
				console.log(list.children[index]);
				list.children[index].remove();

				guessParagraph[guessno - 1] = guess + " " + direction(guessIsland);
				guessno += 1;
			}
		}
	}
</script>

<datalist id="options" />

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
		font-size: 110%;
		margin-top: 0px;
		margin-bottom: 5px;
		background-color: white;
		width: 240px;
		height: 25px;
		border-radius: 5px;
	}
	img {
		width: 240px;
		border-radius: 8px;
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
		color: black;
		background-color: greenyellow;
	}

	.close {
		color: black;
		background-color: yellow;
	}
</style>
