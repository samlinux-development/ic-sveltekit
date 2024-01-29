<script lang="ts">
  import { createActor } from '../../declarations/backend';
  import dataStore from '../../stores/data';

  let input = '', greeting = '';

  const handleOnSubmit = async () => {

  try {
    // Canister IDs are automatically expanded to .env config - see vite.config.ts
    const canisterId = import.meta.env.VITE_BACKEND_CANISTER_ID;

    // We pass the host instead of using a proxy to support NodeJS >= v17 (ViteJS issue: https://github.com/vitejs/vite/issues/4794)
    const host = import.meta.env.VITE_HOST || import.meta.env.DFX_HOST || 'https://ic0.app';

    // Create an actor to interact with the IC for a particular canister ID
    const actor = createActor(canisterId, { agentOptions: { host } });
    // Call the IC
    
    let query = {
        query: input,
        date: new Date()
      };

    dataStore.update((store) => ({
      ...store,
      hello: [...store.hello, query]
    }))
  
    greeting = await actor.sayHelloTo(input);
    input = '';

  } catch (err) {
      console.error('>> ',err);
  }
};
</script>

<h1>About page</h1>
<div class="display">
  <div class="box">
    <form on:submit|preventDefault={handleOnSubmit}>
      <label for="name">Say hello to me</label>
      <input id="name" alt="Name" type="text" bind:value={input}/>
      <button type="submit">Click Me!</button>
    </form> 
    <div>
      {greeting}
    </div> 
  </div>
</div>

<div>
  {#if $dataStore.hello.length > 0}
    <h1>You said hello {$dataStore.hello.length} times</h1>
  {/if}
  <ol>
    {#each $dataStore.hello as item}
      <li>{item.query} - {item.date.toISOString()}</li>
    {/each}
  </ol>
</div>

<style>
  .box {
    border: 1px solid black;
    padding: 1rem;
  }
  .display {
    display: flex;
  }
</style>