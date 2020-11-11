<!-- this page checks to see if Mturk user is human -->

<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let answer;
	let numerals = [1, 2, 3, 4];
	let words = ["one", "two", "three", "four"];

	let numAttempts = 3;
	let attemptCounter = 1;

	let currentState = 'bot check';

	let numId1 = Math.floor(Math.random()*words.length);
	let numId2 = Math.floor(Math.random()*words.length);

	// checks answer against ground truth
	function handleSubmit () {
		// success!
		if (answer == (numerals[numId1] + numerals[numId2])) {
			dispatch('finished');
		}
		// incorrect; try again
		else if (attemptCounter < numAttempts) {
			answer = null;
			attemptCounter += 1;

			numId1 = Math.floor(Math.random()*words.length);
			numId2 = Math.floor(Math.random()*words.length);
			
			currentState = 'try again';
		}
		// failure
		else {
			currentState = 'failed';
			dispatch('failed');
		}
	}

	// returns to bot check if previous attempt failed
	function handleClick () {
		currentState = 'bot check';
	}

</script>

<style>
	.container {
		margin: 0 auto !important; 
        text-align: center;
		align-items: center;
		width: 50%;
    }
		

	.bot-box {
		padding: 2%;
		background-color: rgba(255, 255, 255, 0.4);
		border: 2px solid grey;
		border-radius: 2px;
		box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);   
	}

	.button {
		 background-color: lightblue;
	}
</style>


<div class="container">
	<h1>Bot check!</h1>
	{#if currentState === 'bot check'}
			<div class="bot-box">
			<p>
				Let's make sure you're human. What is <strong>{words[numId1]}</strong> 
				plus <strong>{words[numId2]}</strong>? Enter a single numeral in the box below.
			</p>
			<input type="number" id="number" name="number" bind:value={answer}>	
    		<button class="button" on:click={handleSubmit}>Continue</button>
			</div> 

	{:else if currentState === 'try again'}
		<p>Sorry, that was not the correct answer. Please try again.</p>
		<button class="button" on:click={handleClick}>Try again</button>
	{:else if currentState === 'failed'}
		<p>Sorry, too many incorrect answers were entered. <strong>This trial will not continue.</strong></p>
	{/if}
</div>
        








	
	