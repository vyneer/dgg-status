<script>
	import dayjs from 'dayjs';

	let promise5m = fetchEmbeds("5");
	let promise30m = fetchEmbeds("30");
	let promiseLast = fetchEmbeds("last");
	let activeClass = "regular";
	let data5m = [];
	let data30m = [];
	let dataLast = [];
	export let successCheck = false;
	export const onlineCheck = fetchOnline();

	async function fetchOnline() {
		let onlineStatusUrl = `https://vyneer.me/vods/userinfo?user_login=Destiny`;
		let responseOnlineStatus = await fetch(onlineStatusUrl);
		let dataOnlineStatus = await responseOnlineStatus.json();
		if (responseOnlineStatus.ok) {
			if (dataOnlineStatus.data.length > 0) {
				return true;
			} else {
				return false;
			}
		}
	}

	async function fetchEmbeds(time) {
		let data;
		let embedsUrl = `https://vyneer.me/tools/embeds?t=${time}`;
		if (time == "last") {
			embedsUrl = `https://vyneer.me/tools/embeds/last`;
		}
		let response = await fetch(embedsUrl);
		if (response.ok) {
			// test line
			// data = JSON.parse('[{"time":"2020-10-11T23:04:00.291000+00:00","word":"PEPE wins","type":"meganuke"}]');
			data = await response.json();
			if (data.length > 0) {
				successCheck = true;
				activeClass = "active";
			}
			if (time == "5") {
				data5m = data;
			} else if (time == "30") {
				data30m = data;
			} else {
				dataLast = data;
			}
			return response.ok;
		} else {
			successCheck = false;
			throw new Error(`${response.status}`);
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
		<div class="status-text">Top 5 embeds in the last 5 minutes:</div>
		{#await promise5m}
			<div class="{activeClass === 'regular' ? 'status-text' : 'status-text active'}">Loading results...</div>	
		{:then}
			{#if data5m.length != 0}
				{#each data5m as result}
					<div class="status-text-small">
						{#if result.link.includes("strims.gg")}
							<a rel="stylesheet" href="https://{result.link}">{result.platform + "/" + result.channel}</a> ({result.count} {#if result.count == 1} embed{:else} embeds{/if})
						{:else}
							<a rel="stylesheet" href="https://destiny.gg/bigscreen{result.link}">{result.link}</a> ({result.count} {#if result.count == 1} embed{:else} embeds{/if})
						{/if}
					</div>
				{/each}
			{:else}
				<div class="status-text-small">Nobody embedded anything in the last 5 mins :(</div>
			{/if}
		{:catch error}
			{#if error.message === "429"}
				<div class="{activeClass === 'regular' ? 'status-text' : 'status-text active'}">{error} Too Many Requests! <br> Try again a bit later :)</div>
			{:else}
				<div class="{activeClass === 'regular' ? 'status-text' : 'status-text active'}">{error}</div>
			{/if}
		{/await}
	</div>

	<div>
		<div class="status-text">Top 5 embeds in the last 30 minutes:</div>
		{#await promise30m}
			<div class="{activeClass === 'regular' ? 'status-text' : 'status-text active'}">Loading results...</div>	
		{:then}
			{#if data30m.length != 0}
				{#each data30m as result}
					<div class="status-text-small">
						{#if result.link.includes("strims.gg")}
							<a rel="stylesheet" href="https://{result.link}">{result.platform + "/" + result.channel}</a> ({result.count} {#if result.count == 1} embed{:else} embeds{/if})
						{:else}
							<a rel="stylesheet" href="https://destiny.gg/bigscreen{result.link}">{result.link}</a> ({result.count} {#if result.count == 1} embed{:else} embeds{/if})
						{/if}
					</div>
				{/each}
			{:else}
				<div class="status-text-small">Nobody embedded anything in the last 30 mins :(</div>
			{/if}
		{:catch error}
			{#if error.message === "429"}
				<div class="{activeClass === 'regular' ? 'status-text' : 'status-text active'}">{error} Too Many Requests! <br> Try again a bit later :)</div>
			{:else}
				<div class="{activeClass === 'regular' ? 'status-text' : 'status-text active'}">{error}</div>
			{/if}
		{/await}
	</div>

	<div>
		<div class="status-text">Last 5 embeds:</div>
		{#await promiseLast}
			<div class="{activeClass === 'regular' ? 'status-text' : 'status-text active'}">Loading results...</div>	
		{:then}
			{#if dataLast.length != 0}
				{#each dataLast as result}
					<div class="status-text-small">
						{#if result.link.includes("strims.gg")}
							({dayjs.unix(result.timestamp).format("HH:mm:ss")}) <a rel="stylesheet" href="https://{result.link}">{result.platform + "/" + result.channel}</a>
						{:else}
							({dayjs.unix(result.timestamp).format("HH:mm:ss")}) <a rel="stylesheet" href="https://destiny.gg/bigscreen{result.link}">{result.link}</a>
						{/if}
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
	</div>
</div>