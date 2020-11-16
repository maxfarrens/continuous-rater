<!-- this builds the rating box -->

<script>
    import { db } from './utils.js';
    
    export let ratingType;
    export let rating; // median value for ratings
    export let pathway;
    export let time; // used to create dict with timestamp and rating
    export let paused;
    export let ratingBoxUse = 'actual';
    
    let width = "800";
    let height = "200";
    let n = width; // number of points displayed in graphic
    let ogStepSize = 2;
    let stepAccel = 1.1;
    let opacity = 0;
    let docRef;
    let prevKeyCode;
    
    // grabs reference for rating doc or creates it
    if (ratingBoxUse != 'demo page') {
        docRef = db.doc(pathway);
        docRef.set({0: rating});
    }

    let stepSize = ogStepSize;
    let numbers = [];

    // fills array with values
    for (let i = 0; i < n; i++) {
        numbers = [...numbers, rating];
    }
    
    // resets step size after key hold
    const handleKeyUp = (e) => { 
        if (e.keyCode === 38 || e.keyCode === 40) { // up and down arrow keys
            stepSize = ogStepSize;
        }  
    };
    
    // moves rating value
    const handleKeyPress = (e)  => {
        if (!paused) {
            if (e.keyCode === 38) { // up arrow
                if (!(prevKeyCode === 38)) {
                        stepSize = ogStepSize;
                    }
                prevKeyCode = 38;
                rating = Math.min(rating + stepSize, 100);
                stepSize *= stepAccel;
                
                if (ratingBoxUse != 'demo page') {
                    let dictTime = Math.round(time);
                    let dictVal = Math.round(rating);
                    docRef.update({[dictTime]: dictVal});
                }
            }

            else if (e.keyCode === 40) { // down arrow
                if (!(prevKeyCode === 40)) {
                        stepSize = ogStepSize;
                    }
                prevKeyCode = 40;
                rating = Math.max(rating - stepSize, 0); 
                stepSize *= stepAccel;

                if (ratingBoxUse != 'demo page') {
                    let dictTime = Math.round(time);
                    let dictVal = Math.round(rating);
                    docRef.update({[dictTime]: dictVal});
                }
            }
        }
    };

    // updates numbers array for animation with most recent rating data
    const setNumbers = () => { 
        if (!paused) {
            // moves each previous rating one to the left
            for (let i = n - 1; i >= 0; i--) {
                numbers[i + 1] = numbers[i];
            }
            // numbers[0] = (100 * scaleFactor - rating);
            numbers[0] = 100 - rating;
        }
    };

    // function for animating rating box: currently unsure how it works
    const animate = timestamp => {
        setNumbers(timestamp / 1000); // timestamp is time from origin of browser load
        requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
</script>


<style>
	.rating-box {
        width: 50%;
        border: 1px solid #aaa;
        background-color: rgba(192, 192, 192, 0.384);
		border-radius: 2px;
        box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
        padding-top: 1%;
        padding-bottom: 1%;
	}

    line {
        stroke: grey;
        stroke-width: 4px;
    }

    .first-anchor {
        padding-bottom: 2%;
        padding-left: 2%;

    }

    .last-anchor {
        padding-top: 2%;
        padding-left: 2%;

    }

    .reference {
        stroke: rgba(192, 192, 192, 1.0);
        stroke-width: 2px;
        stroke-dasharray: 5;
        z-index: -1;

    }

    svg {
        border-top: 1px solid #aaa;
        border-bottom: 1px solid #aaa;
        background-color: white;
    }

</style>

<svelte:window on:keydown|preventDefault={handleKeyPress} on:keyup|preventDefault={handleKeyUp}/> 

<article class="rating-box">
    <div class="first-anchor">Most {ratingType}</div>
    <svg viewBox="0 0 {width} {height}">
         <line class="reference"
            x1=0
            y1={height / 2}
            x2={width}
            y2={height / 2}
        />
        {#each numbers as y, i}
            {#if i < n - 1}
                <circle 
                    cx={(i / n) * width} 
                    cy={(y / 100) * height} 
                    r="1"
                />
                <line
                    x1={(i / n) * width}
                    y1={(y / 100) * height}
                    x2={(i + 1) / n * width}
                    y2={(numbers[i + 1] / 100) * height}
                />
            {/if}
        {/each}
        <circle cx=0 cy={numbers[0] / (100) * height} r="5" />
    </svg> 
    <div class="last-anchor">Least {ratingType}</div>
</article>







