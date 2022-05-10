import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		guess1: "a",
		guess2: "b",
		guess3: "c",
		guess4: "d",
		guess5: "e",
		guess6: "f",
	}
});

export default app;