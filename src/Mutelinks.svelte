<script>
	let mutelinksUrl = "https://vyneer.me/tools/mutelinks";
	let promise = checkMutelinks();
	let activeClass = "regular";
	let dataRaw = [];
	export let successCheck = false;

	async function checkMutelinks() {
		let response = await fetch(mutelinksUrl);
		if (response.ok) {
			// test line
			// let data = JSON.parse('{"status": "all","time": "2020-10-09T05:27:10.291000+00:00"}');
			dataRaw = await response.json();
			let data = (dataRaw.length > 0) ? dataRaw[0] : [];
			if (data.status === "on" || data.status === "all") {
				successCheck = true;
				activeClass = "active";
			}
			return await data;
		} else {
			successCheck = false;
			throw new Error(response.status);
		}
	}
</script>

{#await promise}
	<div class="{activeClass === 'regular' ? 'status-text' : 'status-text active'}">Loading results...</div>	
{:then data}
	{#if data.status === "all"}
		<div class="{activeClass === 'regular' ? 'status-text' : 'status-text active'}">ALL links will get you muted for {data.duration}!</div>
	{:else if data.status === "on"}
		<div class="{activeClass === 'regular' ? 'status-text' : 'status-text active'}">Links tagging {data.user} will get you muted for {data.duration}!</div>
	{:else}
		<div class="{activeClass === 'regular' ? 'status-text' : 'status-text active'}">Links will NOT get you muted!</div>
	{/if}
{:catch error}
	{#if error.message === "429"}
		<div class="{activeClass === 'regular' ? 'status-text' : 'status-text active'}">{error} Too Many Requests! <br> Try again a bit later :)</div>
	{:else}
		<div class="{activeClass === 'regular' ? 'status-text' : 'status-text active'}">{error}</div>
	{/if}
{/await}

