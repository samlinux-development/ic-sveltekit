<script lang="ts">
  import { ic } from '../../stores/ic';
  import dataStore from '../../stores/data';

  let input = '', greeting = '';

  const handleOnSubmit = async () => {
    try {

      // Call the IC
      
      let query = {
          query: input,
          date: new Date()
        };

      dataStore.update((store) => ({
        ...store,
        hello: [...store.hello, query]
      }))
    
      greeting = await $ic.actor.sayHelloTo(input);
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