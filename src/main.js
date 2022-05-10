import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		guess1: "",
		guess2: "",
		guess3: "",
		guess4: "",
		guess5: "",
		guess6: "",
	}
});

export default app;