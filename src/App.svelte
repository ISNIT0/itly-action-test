<script>
  import { onMount } from "svelte";
  import itly from "./itly";
  itly.load({});

  let numLoads = Number(localStorage.numLoads || 0);
  let sum = "2 + 2";
  let parseErr;

  onMount(() => {
    numLoads += 1;
    localStorage.numLoads = numLoads;
    itly.userLoadsApp({ numLoads });
  });

  export function makeTypeCharacter(char) {
    return () => {
      sum = `${sum}${char}`;
      itly.typeCharacter({ character: `${char}` });
    };
  }
  export function typeBackspace() {
    sum = sum.slice(0, -1);
    itly.typeCharacter({ character: "backspace" });
  }
  export function doCalculate() {
    try {
      sum = `${eval(sum)}`;
      parseErr = null;
      itly.doSum({ sum });
    } catch (err) {
      parseErr = err;
      itly.sumError({ message: err.message });
    }
  }
</script>

<main>
  <h1>Itly Calc</h1>
  {#if parseErr}
    <div class="warn">{parseErr.message}</div>
  {/if}
  <div class="calculator">
    <div class="sum">{sum}</div>
    <div class="row">
      <button on:click={makeTypeCharacter(7)}>7</button>
      <button on:click={makeTypeCharacter(8)}>8</button>
      <button on:click={makeTypeCharacter(9)}>9</button>
      <button on:click={makeTypeCharacter("/")}>div</button>
    </div>
    <div class="row">
      <button on:click={makeTypeCharacter(4)}>4</button>
      <button on:click={makeTypeCharacter(5)}>5</button>
      <button on:click={makeTypeCharacter(6)}>6</button>
      <button on:click={makeTypeCharacter("*")}>mul</button>
    </div>
    <div class="row">
      <button on:click={makeTypeCharacter(1)}>1</button>
      <button on:click={makeTypeCharacter(2)}>2</button>
      <button on:click={makeTypeCharacter(3)}>3</button>
      <button on:click={makeTypeCharacter("-")}>sub</button>
    </div>
    <div class="row">
      <button on:click={typeBackspace}>&lt;-</button>
      <button on:click={makeTypeCharacter(0)}>0</button>
      <button on:click={makeTypeCharacter(".")}>.</button>
      <button on:click={makeTypeCharacter("+")}>plus</button>
    </div>
    <div class="row">
      <button on:click={makeTypeCharacter("(")}>(</button>
      <button on:click={makeTypeCharacter(")")}>)</button>
      <button on:click={doCalculate}>=</button>
    </div>
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  .sum {
    font-size: 2em;
    background: #4c4c4c;
    color: white;
    padding: 16px 8px;
    text-align: right;
  }

  .calculator {
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
  }
  .calculator .row {
    display: flex;
    flex-direction: row;
  }
  .calculator .row button {
    width: 100%;
  }

  .warn {
    padding: 16px 8px;
    background: #ff3e00;
    border-radius: 4px;
    color: white;
  }

  button {
    margin: 0;
    background-color: #e0e0e0;
    color: black;
    border-bottom: 1px solid #7f7f76;
    border-left: 1px solid #7f7f76;
    border-radius: 0;
    cursor: pointer;
  }
  button:last-child {
    background-color: #ec9646;
    color: white;
    border-right: 1px solid #7f7f76;
  }
</style>
