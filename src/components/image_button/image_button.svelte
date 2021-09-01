<script>
    import { createEventDispatcher } from 'svelte';
    export let imagePath = "";
    export let padding = 10;
    export let size = 120;
    export let rounded = true; 
    export let backgroundColor = "#cacaca";
    export let hoverBackgroundColor = "#909090";


    const _dispatch = createEventDispatcher();

    function handleClick(){
        _dispatch('click', {})
    }
</script>

<div 
    class="container" 
    on:click={handleClick}
    style="
        width:{size}px; 
        height:{size}px; 
        --backgroundColor: {backgroundColor};
        --hoverBackgroundColor: {hoverBackgroundColor};
        "
    class:rounded={rounded}
    >
    <img src={imagePath} alt="" style="width:{size-padding*2}px; height:{size-padding*2}px;">
</div>


<style>
    .container{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--backgroundColor);
    }
    .container:hover{
        background-color: var(--hoverBackgroundColor);
    }
    .rounded{
        border-radius: 50%;
    }
</style>