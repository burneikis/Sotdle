<script>
	export let guess1;
	export let guess2;
</script>

<main>
	<header>
	<img src="Sotdle.png" alt="Sotdle">
	<br>
	<a href="https://github.com/AlexBurneikis/Sotdle">Github</a>
	</header>
	<body>
		<p>{guess1}</p>
		<p>{guess2}</p>
	</body>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	p {
		color: black;
		font-size: large;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>