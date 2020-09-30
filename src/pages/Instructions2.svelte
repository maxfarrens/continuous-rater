<!-- second instruction page -->

<script>
  // This is the Instructions page. It loops over the instructions array as a user reads and when click to the last page it notifies the main App.svelte component by dispatching a 'finished' event. When the last page of the instructions are reached the forward button turns into a "Take Quiz" button, but currently there is no quiz and it goes straight to the experiment
  import { createEventDispatcher } from 'svelte';

  // Add/remove items here to create more instructions pages
  
  const instructions = [
    'If these instructions make sense and you would like to begin, click the button below to proceed to the task. Otherwise please return this HIT.'
  ];

  const dispatch = createEventDispatcher();
  let currentPage = 0;

  const backward = () => {
    dispatch('back');
  };
  const forward = () => {
    // Check if we're increasing the value of currentPage beyond the number of instructions, if so tell App.svelte we're ready to move to the quiz
    if (currentPage + 1 === instructions.length) {
      dispatch('finished');
    } else {
      currentPage += 1;
      currentPage = Math.min(currentPage, instructions.length - 1);
    }
  };
</script>

<style>
  .container {
    margin: 0 auto !important; 
    max-width: 800px;
    text-align: center;
  }

  .text-box {
    text-align: left;
		padding: 2%;
		background-color: rgba(255, 255, 255, 0.4);
		border: 2px solid grey;
		border-radius: 2px;
		box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);   
	}

   .next {
    background-color: lightblue;
	}

  .back {
    background-color: lightcoral;
  }
</style>
 
<div class="container">
  <h1 >Instructions</h1>
  <div class="text-box">
    <div class="content">
      {@html instructions[currentPage]}
    </div>
  </div>
  <br>
  <button class="back" on:click={backward}>Back</button>
  <button class="next" on:click={forward}>
    {#if currentPage === instructions.length - 1}
      Go To Task
    {:else}
      Next
    {/if}
  </button>
</div>



  