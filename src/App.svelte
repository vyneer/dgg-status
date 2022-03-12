<script lang="ts">
	import Nuke from "./lib/Nuke.svelte";
	import Mutelinks from "./lib/Mutelinks.svelte";
	import Embeds from "./lib/Embeds.svelte";
	import Phrases from "./lib/Phrases.svelte";

	import chuurch0 from "./assets/chuurch0.png"
	import chuurch1 from "./assets/chuurch1.png"
	import chuurch2 from "./assets/chuurch2.png"
	import drownedChuurch0 from "./assets/drowned_chuurch0.png"
	import drownedChuurch1 from "./assets/drowned_chuurch1.png"
	import drownedChuurch2 from "./assets/drowned_chuurch2.png"
	import nukedChuurch0 from "./assets/nuked_chuurch0.png"
	import nukedChuurch1 from "./assets/nuked_chuurch1.png"
	import nukedChuurch2 from "./assets/nuked_chuurch2.png"

	const chuurch = [chuurch0, chuurch1, chuurch2]
	const drownedChuurch = [drownedChuurch0, drownedChuurch1, drownedChuurch2]
	const nukedChuurch = [nukedChuurch0, nukedChuurch1, nukedChuurch2]

	import embed0 from "./assets/embed0.png"
	import embed1 from "./assets/embed1.png"
	import embed2 from "./assets/embed2.png"

	const embeds = [embed0, embed1, embed2]

	import offline from "./assets/offline.png"
	import online from "./assets/online.png"

	import cam from "./assets/cam.png"
	
	let nukeSuccess;
	let linksSuccess;
	let embedsSuccess;
	let phrasesSuccess;
	let onlineSuccess;

	let embedSrc1 = embeds[(Math.random() * embeds.length) | 0];
	let embedSrc2 = offline;

	function changePic() {
		embedSrc1 = online;
		embedSrc2 = online;
	}
</script>


<header>
	<a href="https://vyneer.me"><i class="home-button fas fa-home"></i></a>
	<h1>d.gg chat status</h1>

	<img src={cam} alt="Camera" class="header-img">
</header>

<main>
	<div class="status-element">
		{#if nukeSuccess}
			<img src={nukedChuurch[(Math.random() * nukedChuurch.length) | 0]} alt="Chuurch Meme" class="status-img">
		{:else}
			<img src={chuurch[(Math.random() * chuurch.length) | 0]} alt="Chuurch Meme" class="status-img">
		{/if}
		<Nuke bind:successCheck={nukeSuccess}/>
	</div>
	<div class="status-element">
		{#if linksSuccess}
			<img src={drownedChuurch[(Math.random() * drownedChuurch.length) | 0]} alt="Chuurch Meme" class="status-img">
		{:else}
			<img src={chuurch[(Math.random() * chuurch.length) | 0]} alt="Chuurch Meme" class="status-img">
		{/if}
		<Mutelinks bind:successCheck={linksSuccess}/>
	</div>
	<div class="status-element">
		<img src={chuurch[(Math.random() * chuurch.length) | 0]} alt="Chuurch Meme" class="status-img">
		<Phrases bind:successCheck={phrasesSuccess}></Phrases>
	</div>
	<div class="status-element">
		{#if embedsSuccess}
			<img src={embedSrc1} alt="Happy Peepo watching a stream" class="status-img-lower">
		{#await onlineSuccess}
			<div class="status-text-small-no-width">Loading Steven's online status...</div>
		{:then result}
			{#if result}
				{changePic()}
				<a href="https://destiny.gg/bigscreen"><div class="status-text-no-width active">Steven is online!</div></a>
			{/if}
		{/await}
		{:else}
			<img src={embedSrc2} alt="Sad peepo looking at Destiny's offline screen" class="status-img-lower">
			{#await onlineSuccess}
			<div class="status-text-small-no-width">Loading Steven's online status...</div>
			{:then result}
				{#if result}
					{changePic()}
					<a href="https://destiny.gg/bigscreen"><div class="status-text-no-width active">Steven is online!</div></a>
				{/if}
			{/await}
		{/if}
		<Embeds bind:successCheck={embedsSuccess} bind:onlineCheck={onlineSuccess}/>
	</div>
</main>

<footer class="status-text-small">
	if something is wrong/broken msg vyneer in dgg PepoComfy <br>
	huge thanks to Mitch in dgg chat for the initial phrases data!
</footer>

<style>
	:global(body) {
		background-color: #333333;
	}

	h1 {
		margin: auto;
		padding-left: 5%;
		color: white;
		font-size: 3em;
		text-align: center;
		font-family: "Roboto",Helvetica,"Trebuchet MS",Verdana,sans-serif;
	}

	main {
		display: flex;
		flex: 1 0 auto;
		text-align: center;
		padding: 40px;
		max-width: 1020px;
		margin: 0 auto;
		justify-content: center;
		flex-wrap: wrap;
	}

	.status-img, .status-img-lower {
		object-fit: contain;
		width: 200px;
		height: 200px;
	}

	.status-img {
		transform: scaleX(-1);
	}

	.home-button {
		color: white;
		font-size: xx-large;
	}

	.header-img {
		transform: scaleX(-1);
		float: right;
		object-fit: contain;
		width: 100px;
		height: 100px;
	}

	header {
		display: flex;
		justify-content: space-between;
	}

	footer {
		flex-shrink: 0;
		width: auto;
		text-align: center;
	}

	@media (max-width: 600px) {
		.status-element {
			padding-bottom: 1em;
		}
	}
</style>