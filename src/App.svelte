<script>
	import { onMount } from "svelte";

	let Islands = [];

	let answer;
	let imgsrc;
	let guessno;
	let guess;
	let buttonText;

	let gpClass = [];
	let guessParagraph = ["", "", "", "", "", ""];
	let guessDirection = ["", "", "", "", "", ""];

	function overlayOn() {
		document.getElementById("overlay").style.display = "block";
	}

	function overlayOff() {
		document.getElementById("overlay").style.display = "none";
	}

	function setup() {
		answer = Islands[Math.floor(Math.random() * Islands.length)];
		imgsrc = answer.Image;
		guessno = 1;
		buttonText = "Guess";
		fill();
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

	function showAnswer() {
		alert("The answer was " + answer.Name + ".");
	}

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

	let clicked;
	let focused;
	let blurred = false;

	function clear() {
		guess = "";
	}
	function blur() {
		blurred = true;
	}
	function click() {
		clicked = true;
		if (focused) {
			if (!blurred) {
				clear();
				focused = false;
				return;
			}
		}
	}
	function focus() {
		focused = true;
		if (clicked) {
			if (!blurred) {
				clear();
				clicked = false;
				return;
			}
		}
		blurred = false;
	}
	function fill() {
		guess = Islands[0]["Name"];
	}

	function guessButton() {
		if (guessno <= 6) {
			if (isIsland(guess)) {
				if (isWin(guess)) {
					gpClass[guessno - 1] = "win";
					guessParagraph[guessno - 1] = guess;
					guessno = 8;
					buttonText = "Again";
					blurred = false;
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

				guessParagraph[guessno - 1] = guess + " ";
				guessDirection[guessno - 1] = direction(guessIsland);

				guessno += 1;
				if (guessno === 7) {
					buttonText = "Answer";
					blurred = false;
					return;
				}
				fill();
			}
		} else if (guessno === 7) {
			showAnswer();
			buttonText = "Again";
			guessno = 8;
			blurred = false;
			return;
		} else if (guessno === 8) {
			document.location.reload();
		}
	}
</script>

<datalist id="options" />

<main>
	<header>
		<img class="logo" src="Sotdle.png" alt="Sotdle" />
		<h6>
			Alex Burneikis <a href="https://github.com/alexburneikis/sotdle"
				>Github</a
			>,
			<a
				href="https://github.com/AlexBurneikis/Sotdle/blob/main/README.md"
				>Help</a
			>,
			<a href="https://daily.sotdle.xyz">Daily</a>
		</h6>
	</header>
	<div class="container">
		<img src={imgsrc} alt="island" />
		<button on:click={overlayOn}>Easy Mode</button>
	</div>
	<body>
		<div on:click={overlayOff} id="overlay">
			<img src="EasyModeMap.png" alt="easymodemap" />
		</div>
		<input
			id="input"
			bind:value={guess}
			list="options"
			on:focus={focus}
			on:blur={blur}
			on:click={click}
		/>
		<button class="disable-dbl-tap-zoom" on:click={guessButton}
			>{buttonText}</button
		>
		<p class={gpClass[0]}>
			{guessParagraph[0]}<span>{guessDirection[0]}</span>
		</p>
		<p class={gpClass[1]}>
			{guessParagraph[1]}<span>{guessDirection[1]}</span>
		</p>
		<p class={gpClass[2]}>
			{guessParagraph[2]}<span>{guessDirection[2]}</span>
		</p>
		<p class={gpClass[3]}>
			{guessParagraph[3]}<span>{guessDirection[3]}</span>
		</p>
		<p class={gpClass[4]}>
			{guessParagraph[4]}<span>{guessDirection[4]}</span>
		</p>
		<p class={gpClass[5]}>
			{guessParagraph[5]}<span>{guessDirection[5]}</span>
		</p>
	</body>
</main>

<style>
	@font-face {
		font-family: "Sotfont2";
		src: url(/sot_fonts/font2.ttf);
	}
	@font-face {
		font-family: "Sotfont3";
		src: url(/sot_fonts/font3.ttf);
	}
	@font-face {
		font-family: "Sotfont4";
		src: url(/sot_fonts/font4.ttf);
	}
	span {
		font-family: Sotfont3;
	}

	.container button {
		position: absolute;
		font-size: 2vw;
		padding-left: 0.5vw;
		padding-right: 0.5vw;
		top: 8%;
		left: 1%;
		height: auto;
		width: auto;
		border-radius: 5px;
	}

	#overlay {
		position: fixed; /* Sit on top of the page content */
		display: none; /* Hidden by default */
		width: 100%; /* Full width (cover the whole page) */
		height: 100%; /* Full height (cover the whole page) */
		padding-top: 5vh;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(
			0,
			0,
			0,
			0.5
		); /* Black background with opacity */
		z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
		cursor: pointer; /* Add a pointer on hover */
	}
	#overlay img {
		width: 90vmin;
		height: 90vmin;
	}

	main {
		margin: 0 auto;

		padding: 0;
		padding-top: 0;

		text-align: center;
	}
	.logo {
		height: calc(6vh - env(safe-area-inset-bottom));
		min-height: 30px;
		width: auto;
		margin: auto;
	}
	h6 {
		margin: 0;
		font-family: Sotfont4;
	}
	body {
		margin-top: 2px;
		padding: 0;
		text-align: center;
		height: calc(20vh - env(safe-area-inset-bottom));
	}
	p {
		font-family: Sotfont2;
		font-size: calc(1.5vh - env(safe-area-inset-bottom));

		margin: auto;
		margin-bottom: 2px;

		width: calc(60vmin - env(safe-area-inset-bottom));
		height: 12.5%;

		border-radius: 5px;

		background-color: rgb(181, 165, 153);
	}

	img {
		height: calc(70vmin - env(safe-area-inset-bottom));
		display: block;
		margin: auto;
		border-radius: 8px;
	}

	input {
		vertical-align: top;
		padding: 0;
		padding-left: 5px;
		border-radius: 5px;
		height: 16%;
		margin: 0;
		width: calc(45vmin - env(safe-area-inset-bottom));
		font-size: calc(2.4vmin - env(safe-area-inset-bottom));
		border-radius: 5px;
		border: 0;
		font-family: Sotfont3;
		background-color: rgb(181, 165, 153);
	}
	button {
		margin-bottom: 2px;
		display: inline;
		vertical-align: top;
		border-radius: 5px;
		height: 16%;
		width: calc(14vmin - env(safe-area-inset-bottom));
		font-size: calc(2.5vmin - env(safe-area-inset-bottom));
		padding: 0;
		border: 0;
		background-color: rgb(181, 165, 153);
		font-family: Sotfont3;
	}

	.win {
		color: black;
		background-color: rgb(0, 255, 0);
	}
	.close {
		color: black;
		background-color: yellow;
	}

	.disable-dbl-tap-zoom {
		touch-action: manipulation;
	}
</style>
