<script>
  import { dev, email} from '../utils.js';
  import { createEventDispatcher } from 'svelte';
  let emailAddress = "mailto:" + email;

  const dispatch = createEventDispatcher();

</script>

<style>
  .banner {
    width: 100%;
    text-align: center;
    padding: 0.5rem;
    border-radius: 0.25rem;
    background-color: lightgray;
  }
  .icon:hover {
    cursor: pointer;
  }
  span {
    display: inline;
  }
</style>

  <div>
    {#if $dev}
        <div class="banner dev">
            <span class="icon" on:click={() => dispatch('resetTestWorker')}>
                Dev mode (click here to reset test subject)
            </span>
        </div>
    {:else}
        <div class="banner mturk">
            <span>
                If you have questions about this HIT please <a href={emailAddress}>email us</a>
            </span>
        </div>
    {/if}
</div>
