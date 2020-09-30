<script>

    import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
    

    function handleToTask () {
        dispatch('task');
    }

    function handleToInstructions () {
        dispatch('instructions');
    }

    function handleToConsent () {
        dispatch('consent');
    }

</script>

<style>
    .container {
        margin: 0 auto !important;
        align-items: center;
        text-align: center;
        width: 50%;
    }

    .text-box {
        text-align: left;
        padding: 2%;
        background-color: rgba(255, 255, 255, 0.4);
        border: 2px solid grey;
        border-radius: 2px;
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);   
    }

    .yes {
        background-color: lightblue;
    }
</style>

<div class="container">
    <h1>Welcome back!</h1>
    <div class="text-box">
        <p>Thanks for repeating this HIT.</p>
        <p>If you remember the instructions, feel free to proceed straight to the next video.</p>
        <p>Otherwise, take a moment to review instructions or return to our consent form.</p>
        <p>No matter what you choose, you will have to answer a quick question to ensure you're still human.</p>
    </div>
    <br>
    <button class="yes" on:click={handleToTask}>Continue To Task</button>
    <button class="yes" on:click={handleToInstructions}>Review Instructions</button>
    <button class="yes" on:click={handleToConsent}>View Consent</button>
</div>