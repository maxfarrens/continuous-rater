<!-- this page handles the intro -->

<script>
    import {totalHITTime, estHITTime, HITPay, studyTasks} from '../utils.js'
</script>

<style>
    .container {
        text-align: center;
        align-items: center;
        width: 50%;
        margin: 0 auto !important; 
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
    <h1>HIT Preview</h1>
    <div class="text-box">
        <p>This HIT involves {studyTasks}.</p>
        <p>You are given {totalHITTime} minutes to complete this HIT, but it should only take about {estHITTime}.</p>
        <p>This HIT pays ${HITPay}.</p>
        <p>Please accept this HIT if you are interested!</p>
    </div>
</div>



