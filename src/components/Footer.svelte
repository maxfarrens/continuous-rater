<script>
  import { dev, email} from '../utils.js';
  import { createEventDispatcher } from 'svelte';
  let emailAddress = "mailto:" + email;

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
    /* background-color: lightcoral; */
  }
  .dev {
    background-color: rgba(209, 128, 128, 0.589);
  }
  .mturk {
    background-color: rgba(173, 216, 230, 0.63);
  }
  .icon:hover {
    cursor: pointer;
  }
  p {
    display: inline;
  }
</style>

  <div>
    {#if $dev}
        <div class="banner dev">
            <span class="icon" on:click={() => dispatch('resetTestWorker')}>
                Dev mode (click to reset test subject)
            </span>
        </div>
    {:else}
        <div class="banner mturk">
            <p>If you have questions about this HIT please <a href={emailAddress}>email us</a></p>
        </div>
    {/if}
</div>
