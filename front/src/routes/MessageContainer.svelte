<script>
    export let Msg;
    export let errorMsg;
</script>

<style>
  .message-container {
    margin: 1rem 0;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    }

    .message {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    }

    .success {
    background-color: #77dd77;
    color: #333;
    }

    .error {
    background-color: #ff6666;
    color: white;
    }
</style>


<div class="message-container">
    {#if Msg != ""}
      <div class="message success">{Msg}</div>
    {/if}
  
    {#if errorMsg != ""}
      <div class="message error">{errorMsg}</div>
    {/if}
</div>
