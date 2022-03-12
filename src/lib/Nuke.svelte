<script>
	import dayjs from 'dayjs';
	import duration from 'dayjs/plugin/duration';
	import utc from 'dayjs/plugin/utc';
	dayjs.extend(duration);
	dayjs.extend(utc);

	let nukesUrl = "https://vyneer.me/tools/nukes";
	let promise = fetchNukes();
	let activeClass = "regular";
	let data = [];
	export let successCheck = false;

	async function fetchNukes() {
		let response = await fetch(nukesUrl);
		if (response.ok) {
			// test line
			//data = JSON.parse('[{"time":"2020-10-11T23:04:00.291000+00:00","word":"PEPE wins","type":"meganuke","victims":30}]');
			data = await response.json();
			if (data.length > 0) {
				successCheck = true;
				setInterval(() => {
					data.forEach(element => {
						element.timeLeft = calcDuration(element.time);
						data = data;
					});
				}, 1000);
				activeClass = "active";
			}
			return response.ok;
		} else {
			successCheck = false;
			throw new Error(response.status);
		}
	}
	
	let calcDuration = (time) => {
		let currentTime = dayjs();
		let nukeTime = dayjs(time);
		let expiryTime = nukeTime.add(5, 'minutes').add(4, 'seconds');
		let timeDiff = expiryTime.diff(currentTime);
		let timeDur = dayjs.duration(timeDiff);
		// this is a workaround since theres no way to format durations in dayjs, very scuffed
		return `${dayjs.utc(timeDur.asMilliseconds()).format('mm:ss')}`;
	}

</script>

{#await promise}
	<div class="{activeClass === 'regular' ? 'status-text' : 'status-text active'}">Loading results...</div>	
{:then}
	{#if data.length != 0}
		<div class="{activeClass === 'regular' ? 'status-text' : 'status-text active'}">Active nukes:</div>
		{#each data as result}
			<div class="status-text">
				{#if !result.timeLeft}
					{result.word} ({result.type.toString().toLowerCase()}d {#if ('victims' in result)}{result.victims} {#if result.victims == 1}person{:else}people{/if}{/if} for {result.duration}): getting time...
				{:else if Number.parseInt(result.timeLeft.split(":")[0]) > "5" || Number.parseInt(result.timeLeft.split(":")[0]) === "0"}
					{result.word} ({result.type.toString().toLowerCase()}d {#if ('victims' in result)}{result.victims} {#if result.victims == 1}person{:else}people{/if}{/if} for {result.duration}): done!
				{:else}
					{result.word} ({result.type.toString().toLowerCase()}d {#if ('victims' in result)}{result.victims} {#if result.victims == 1}person{:else}people{/if}{/if} for {result.duration}): {result.timeLeft} left
				{/if}
				
			</div>
		{/each}
	{:else}
		<div class="{activeClass === 'regular' ? 'status-text' : 'status-text active'}">No nukes detected!</div>
	{/if}
{:catch error}
	{#if error.message === "429"}
		<div class="{activeClass === 'regular' ? 'status-text' : 'status-text active'}">{error} Too Many Requests! <br> Try again a bit later :)</div>
	{:else}
		<div class="{activeClass === 'regular' ? 'status-text' : 'status-text active'}">{error}</div>
	{/if}
{/await}


