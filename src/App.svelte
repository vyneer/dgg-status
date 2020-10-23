<script>
	import Nuke from "./Nuke.svelte";
	let nukeSuccess;

	let src1;
	let src1_nuked;

	let loadImages = () => {
		let src1_number = getRandomInt(3);
		src1 = `__buildPath__/images/chuurch${src1_number}.png`;
		src1_nuked = `__buildPath__/images/nuked_chuurch${src1_number}.png`;
	}

	function getRandomInt(max) {
  		return Math.floor(Math.random() * Math.floor(max));
	}

	loadImages();
</script>


<header>
	<img src="__buildPath__/images/cam.png" alt="Camera" class="header-img">

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

	@media (max-width: 600px) {
		main {
			display: block !important;
		}

		.status-element {
			padding-bottom: 1em;
		}
	}
</style>