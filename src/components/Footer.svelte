<script>
  import { dev } from '../utils.js';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
</script>

<style>
  .banner {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
    padding: 0.5rem;
    border-radius: 0.25rem;
  }
  .icon:hover {
    cursor: pointer;
  }
  p {
    display: inline;
  }
</style>

<div
  class="has-text-white banner"
  class:has-background-danger={$dev}
  class:has-background-grey-light={!$dev}>
  {#if $dev}
    <button on:click={() => dispatch('resetTestWorker')}>Development mode</button>
    <!-- <span class="icon" on:click={() => dispatch('resetTestWorker')}> -->
      <!-- <i class="fas fa-redo-alt" /> -->
    <!-- </span> -->
  {:else}
    <p>If if you have questions about this HIT please <a href="mailto:computational.social.affective.neuroscience.lab@dartmouth.edu">email us</a>  </p>
  {/if}
</div>
