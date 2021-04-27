<script>
	import Nuke from "./Nuke.svelte";
	import Mutelinks from "./Mutelinks.svelte";
	import Embeds from "./Embeds.svelte";
	import Phrases from "./Phrases.svelte";
	let nukeSuccess;
	let linksSuccess;
	let embedsSuccess;
	let phrasesSuccess;
	let onlineSuccess;

	let src1;
	let src1_nuked;
	let src2;
	let src2_drowned;
	let src3;
	let src3_embed;
	let src4;

	let loadImages = () => {
		let src1_number = getRandomInt(3);
		let src2_number = getRandomInt(3);
		let src3_number = getRandomInt(3);
		let src4_number = getRandomInt(3);
		src1 = `/status/images/chuurch${src1_number}.png`;
		src1_nuked = `/status/images/nuked_chuurch${src1_number}.png`;
		src2 = `/status/images/chuurch${src2_number}.png`;
		src2_drowned = `/status/images/drowned_chuurch${src2_number}.png`;
		src3 = `/status/images/offline.png`;
		src3_embed = `/status/images/embed${src3_number}.png`;
		src4 = `/status/images/chuurch${src4_number}.png`;
	}

	function getRandomInt(max) {
  		return Math.floor(Math.random() * Math.floor(max));
	}

	function changePic() {
		src3 = `/status/images/online.png`;
		src3_embed = `/status/images/online.png`;
	}

	loadImages();
</script>


<header>
	<img src="/status/images/cam.png" alt="Camera" class="header-img">

	<h1>d.gg chat status</h1>
</header>

<main>
	<div class="status-element">
		{#if nukeSuccess}
			<img src={src1_nuked} alt="Chuurch Meme" class="status-img">
		{:else}
			<img src={src1} alt="Chuurch Meme" class="status-img">
		{/if}
		<Nuke bind:successCheck={nukeSuccess}/>
	</div>
	<div class="status-element">
		{#if linksSuccess}
			<img src={src2_drowned} alt="Chuurch Meme" class="status-img">
		{:else}
			<img src={src2} alt="Chuurch Meme" class="status-img">
		{/if}
		<Mutelinks bind:successCheck={linksSuccess}/>
	</div>
	<div class="status-element">
		<img src={src4} alt="Chuurch Meme" class="status-img">
		<Phrases bind:successCheck={phrasesSuccess}></Phrases>
	</div>
	<div class="status-element">
		{#if embedsSuccess}
			<img src={src3_embed} alt="Happy Peepo watching a stream" class="status-img">
		{#await onlineSuccess}
			<div class="status-text-small-no-width">Loading Steven's online status...</div>
		{:then result}
			{#if result}
				{changePic() || ""}
				<a href="https://destiny.gg/bigscreen"><div class="status-text-no-width active">Steven is online!</div></a>
			{/if}
		{/await}
		{:else}
			<img src={src3} alt="Sad peepo looking at Destiny's offline screen" class="status-img">
			{#await onlineSuccess}
			<div class="status-text-small-no-width">Loading Steven's online status...</div>
			{:then result}
				{#if result}
					{changePic() || ""}
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
		padding-right: 5%;
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

	.status-img {
		object-fit: contain;
		width: 200px;
		height: 200px;
	}

	.header-img {
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