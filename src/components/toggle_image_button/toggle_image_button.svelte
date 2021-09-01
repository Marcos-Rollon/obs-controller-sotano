<script>
    import ImageButton from "../image_button/image_button.svelte"
    import { createEventDispatcher } from 'svelte';
    export let imagePath = "";
    export let activeImagePath = "";
    export let isActive = false;
    export let padding = 10;
    export let size = 120;
    export let rounded = true; 
    export let backgroundColor = "#D81159";
    export let hoverBackgroundColor = "#909090";
    export let activeBackgroundColor = "#46f5c0";


    const _dispatch = createEventDispatcher();

    function handleClick(){
        _dispatch('click', {})
    }
</script>
<ImageButton
    on:click = {handleClick}
    imagePath = {isActive ? activeImagePath : imagePath}
    padding = {padding}
    size = {size}
    rounded = {rounded}
    backgroundColor = {isActive ? activeBackgroundColor : backgroundColor}
    hoverBackgroundColor = {hoverBackgroundColor}
/>
<style></style>