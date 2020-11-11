<script>
  // This component is just for displaying while we wait for firebase responses
</script>

<style>
  .loader-wrapper {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loader {
    width: 35rem;
    height: 35rem;
    position: absolute;
  }
  .loading-text {
    z-index: 9;
  }
</style>

<div class="loader-wrapper">
  <div class="loader is-loading" />
  <div class="loading-text">
    <h1>
      <slot />
    </h1>
  </div>
</div>