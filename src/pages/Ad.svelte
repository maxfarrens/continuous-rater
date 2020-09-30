<!-- this is the MTurk ad -->

<script>
    import { createEventDispatcher } from 'svelte';
    import { totalHITTime, estHITTime, HITPay} from '../utils.js'
    const dispatch = createEventDispatcher();

    function handleClick () {
        dispatch('finished');
    };
</script>

<style>
    body {
        padding:0px;
        margin: 0px;
        background-color: white;
        color: black;
        font-weight: 300; 
        font-size: 13pt;
        text-align: center;
    } 

    .container {
    margin: 0 auto !important; 
    max-width: 800px;
    text-align: center;
    }

    .no-space-hr {
    margin: 0;
    } 

</style>

<head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="/static/css/bootstrap.min.css" type="text/css" />   
</head>
<body>
    <div id="container-not-an-ad" class="media">
        <div class="media-left pull-left" href="#">
                    
        </div>
        <div class="media-body">
​
           <div class="container">
            <h1 class="title is-2 custom-card-title">Videos & Emotion </h1>
            <hr class="no-space-hr" />
    ​
            <p>Watch videos and respond based on how they make you feel.</p>
            <p>This task involves watching videos and providing continuous ratings your emotions.</p>
            <p>This task is NOT meant for mobile devices (and doesn't as work well in Firefox).</p>
            <p>You are given {totalHITTime} minutes to complete the HIT, <strong>but the task itself will only take appx. {estHITTime} minutes</strong>.</p>
            <p>This HIT will only show one video, but you are welcome to repeat the HIT until you have seen all videos. Videos vary in length and play in random order.</p> 
            <p>Please begin working on this task immediately after accepting it so that you are sure to finish in time.</p>
            <p><strong>This hit pays {HITPay}. You will be paid each time you complete this task.</strong></p>
            <p><em>Note: this study may contain media with strong emotional and explicit content, some of which may be disturbing and some of which is not safe for work.</em> 
            <p>As explained on the next screen, you are free to withdraw from this task at any time.</p>
            <p>Please click the "Accept HIT" above to begin the task.</p>
            <br>
            </div>            
        </div>
    </div>
    <button on:click={handleClick}>Click To Proceed</button>
</body>






