<script>
	import Nuke from "./Nuke.svelte";
	import Mutelinks from "./Mutelinks.svelte";
	let nukeSuccess;
	let linksSuccess;

	let src1;
	let src1_nuked;
	let src2;
	let src2_drowned;

	let loadImages = () => {
		let src1_number = getRandomInt(3);
		let src2_number = getRandomInt(3);
		src1 = `/images/chuurch${src1_number}.png`;
		src1_nuked = `/images/nuked_chuurch${src1_number}.png`;
		src2 = `/images/chuurch${src2_number}.png`;
		src2_drowned = `/images/drowned_chuurch${src2_number}.png`;
	}

	function getRandomInt(max) {
  		return Math.floor(Math.random() * Math.floor(max));
	}

	loadImages();
</script>


<header>
	<img src="/images/cam.png" alt="Camera" class="header-img">

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
</main>

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
		text-align: center;
		padding: 40px;
		max-width: 640px;
		margin: 0 auto;
		justify-content: space-between;
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

	@media (max-width: 600px) {
		main {
			display: block !important;
		}

		.status-element {
			padding-bottom: 1em;
		}
	}
</style>