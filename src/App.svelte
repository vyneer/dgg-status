<script>
	import Nuke from "./Nuke.svelte";
	import Mutelinks from "./Mutelinks.svelte";
	import Embeds from "./Embeds.svelte";
	let nukeSuccess;
	let linksSuccess;
	let embedsSuccess;

	let src1;
	let src1_nuked;
	let src2;
	let src2_drowned;
	let src3;
	let src3_embed;

	let loadImages = () => {
		let src1_number = getRandomInt(3);
		let src2_number = getRandomInt(3);
		let src3_number = getRandomInt(3);
		src1 = `/status/images/chuurch${src1_number}.png`;
		src1_nuked = `/status/images/nuked_chuurch${src1_number}.png`;
		src2 = `/status/images/chuurch${src2_number}.png`;
		src2_drowned = `/status/images/drowned_chuurch${src2_number}.png`;
		src3 = `/status/images/offline.png`;
		src3_embed = `/status/images/embed${src3_number}.png`;
	}

	function getRandomInt(max) {
  		return Math.floor(Math.random() * Math.floor(max));
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
		{#if embedsSuccess}
			<img src={src3_embed} alt="Happy Peepo watching a stream" class="status-img">
		{:else}
			<img src={src3} alt="Sad peepo looking at Destiny's offline screen" class="status-img">
		{/if}
		<Embeds bind:successCheck={embedsSuccess}/>
	</div>
</main>

<footer class="status-text-small">
	if something is wrong/broken msg vyneer in dgg PepoComfy
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
		max-width: 640px;
		margin: 0 auto;
		justify-content: center;
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
		main {
			display: block !important;
		}

		.status-element {
			padding-bottom: 1em;
		}
	}
</style>