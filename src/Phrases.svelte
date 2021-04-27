<script>
	let promise = fetchPhrases();
	let activeClass = "regular";
	let dataPhrases = [];
	export let successCheck = false;

	async function fetchPhrases() {
		let data;
		let embedsUrl = `https://vyneer.me/tools/phrases`;
		let response = await fetch(embedsUrl);
		if (response.ok) {
			// test line
			// data = JSON.parse('[{"time":"2020-10-11T23:04:00.291000+00:00","word":"PEPE wins","type":"meganuke"}]');
			data = await response.json();
			if (data.length > 0) {
				successCheck = true;
				activeClass = "active";
			}
			dataPhrases = data
			return response.ok;
		} else {
			successCheck = false;
			throw new Error(response.status);
		}
	}
</script>

<style>
	#embeds {
		display: flex;
	}

	@media (max-width: 855px) {
		#embeds {
			display: block;
		}
	}
</style>

<div id="embeds">
	<div>
		<div class="status-text">Last 5 ban/mute phrases added:</div>
		{#await promise}
			<div class="{activeClass === 'regular' ? 'status-text' : 'status-text active'}">Loading results...</div>	
		{:then}
			{#if dataPhrases.length != 0}
				{#each dataPhrases as result}
					<div class="status-text-small">
						{result.phrase} ({result.duration} {result.type})
					</div>
				{/each}
			{:else}
				<div class="status-text-small">The API didn't return anything :(</div>
			{/if}
		{:catch error}
			{#if error.message === "429"}
				<div class="{activeClass === 'regular' ? 'status-text' : 'status-text active'}">{error} Too Many Requests! <br> Try again a bit later :)</div>
			{:else}
				<div class="{activeClass === 'regular' ? 'status-text' : 'status-text active'}">{error}</div>
			{/if}
		{/await}
		<a class="status-text-small" href="https://mitchdev.net/dgg/">see more...</a>
	</div>
</div>