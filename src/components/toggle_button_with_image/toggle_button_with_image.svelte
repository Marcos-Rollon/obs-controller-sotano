<script>
    import { createEventDispatcher } from 'svelte';
    export let imagePath = "";
    export let activeImagePath="";
    export let text = "";
    export let isActive = false;
    export let borderRadius = 10;
    export let padding = 10;
    export let width = 120;
    export let height = 180;
    export let backgroundColor = "#D81159";
    export let hoverBackgroundColor = "#909090";
    export let activeBackgroundColor = "#46f5c0";
    export let textColor = "#404040";


    const _dispatch = createEventDispatcher();

    function handleClick(){
        _dispatch('click', {})
    }
</script>

<div 
    class="container" 
    on:click={handleClick}
    style="
        width:{width}px; 
        height:{height}px; 
        border-radius: {borderRadius}px;
        --backgroundColor: {backgroundColor};
        --hoverBackgroundColor: {hoverBackgroundColor};
        --activeBackgroundColor: {activeBackgroundColor};
        "
    class:active = {isActive}
    >
    <img 
        src={isActive ? activeImagePath : imagePath} 
        alt="" 
        style="width:{width-padding*2}px; height:{height-padding*2}px;"
    >
    <p style="color:{textColor};">{text}</p>
</div>


<style>
    .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: var(--backgroundColor);
    }
    .container:hover{
        background-color: var(--hoverBackgroundColor);
    }
    .active{
        background-color: var(--activeBackgroundColor);
    }
</style>