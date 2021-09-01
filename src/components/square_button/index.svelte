<script>
export let title ;
export let isActive = false;
export let height = 120, width = 120;
export let onClick = null;
</script>

{#if isActive}
<button on:click={onClick} class="skewBtn button active" style="height: {height}px; width: {width}px">{title}</button>
{:else}
<button on:click={onClick} class="skewBtn button" style="height: {height}px; width: {width}px">{title}</button>
{/if}

<style lang="scss">
$color : #404040;
.active {
	background-color: $color !important; 
	color: white !important;
}
.button{
	border: 2px solid $color;
  color: $color;
  &:hover {
    background-color: $color;
    transition: all 0.3s ease-in-out;
  }
}
.skewBtn{
  outline: none;
  // cursor: pointer;
  background: white;
  transition: .5s;
  font-size: 20px;
  border-radius: 5px;
  font-family: "Lato",sans-serif;
  &:hover{
    border: none;
    color: white;
    font-size: 28px;
    transform:scale(1.1);
  }
}
</style>