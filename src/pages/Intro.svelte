<!-- this page handles the intro -->

<script>
    import { createEventDispatcher } from 'svelte';
    import {totalHITTime, estHITTime, HITPay} from '../utils.js'
    const dispatch = createEventDispatcher();

    function handleClick () {
        dispatch('finished');
    };
</script>

<style>
    .container {
        text-align: center;
        align-items: center;
        width: 50%;
        margin: 0 auto !important; 
    }

    button {
        background-color: lightblue;
    }
    .text-box {
        text-align: left;
        padding: 2%;
        background-color: rgba(255, 255, 255, 0.4);
        border: 2px solid grey;
        border-radius: 2px;
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);   
    }
</style>


<div class="container">
    <h1>Thank you for accepting this HIT!</h1>
    <div class="text-box">
        <p>You are given {totalHITTime} minutes to complete this HIT, but it should only take about {estHITTime}.</p>
        <p>This HIT pays ${HITPay}.</p>
        <p>By clicking the button below, you will be taken to the experiment, 
        including complete instructions and an informed consent agreement.</p>
    </div>
    <br>
    <button on:click={handleClick}>Go To Experiment</button>
</div>



