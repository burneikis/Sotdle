import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		guess1: "Thieves Haven",
		guess2: "Snake Island"
	}
});

export default app;