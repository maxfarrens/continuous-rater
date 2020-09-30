<script>
  // This is the Instructions page. It loops over the instructions array as a user reads and when click to the last page it notifies the main App.svelte component by dispatching a 'finished' event. When the last page of the instructions are reached the forward button turns into a "Take Quiz" button, but currently there is no quiz and it goes straight to the experiment
  import { createEventDispatcher } from 'svelte';
  export let ratingType;

  // Add/remove items here to create more instructions pages
  const ratingInstruct = 'In this task, you will watch a short video (~2-5 min) and provide continuous ratings related to that video. <br><br> Specifically, you will rate how <strong>' + ratingType + '</strong> a video makes you feel by using your keyboard to control a rating box, which is demoed on the next page.'
  
  const instructions = [
    ratingInstruct,
    'If these instructions make sense and you would like to begin, click the button below to proceed to the task. Otherwise please return this HIT.'
  ];

  const dispatch = createEventDispatcher();
  let currentPage = 0;

  const backward = () => {
    currentPage -= 1;
    currentPage = Math.max(currentPage, 0);
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
  .no-space-hr {
    margin: 0;
  }
  .custom-card-title {
    margin-bottom: 2% !important;
    padding-top: 2% !important;
  }
  .controls {
    min-width: 50%;
  }
</style>
 
<!-- add div styling to ensure text doesn't just keep getting wider -->
<div class="container">
  <div class="columns is-centered">
    <div class="column is-three-fifths ">
      <div class="card">
        <div class="has-text-centered">
          <h1 class="title is-2 custom-card-title">Instructions</h1>
          <hr class="no-space-hr" />
        </div>
        <div class="card-content">
          <div class="content">
            {@html instructions[currentPage]}
          </div>
        </div>
        <footer class="card-footer">
          <p class="card-footer-item">
            <button class="button is-link controls" on:click={backward}>
              {#if currentPage === 0}
                <span class="icon">
                  <i class="fas fa-backward" />
                </span>
              {:else}
                <span class="icon">
                  Back
                  <i class="fas fa-backward" />
                </span>
              {/if}
            </button>
          </p>
          <p class="card-footer-item">
            <button class="button is-link controls" on:click={forward}>
              {#if currentPage === instructions.length - 1}
                Go To Task
              {:else}
                <span class="icon">
                  Next
                  <i class="fas fa-forward" />
                </span>
              {/if}
            </button>
          </p>
        </footer>
      </div>
    </div>
  </div>
</div>
