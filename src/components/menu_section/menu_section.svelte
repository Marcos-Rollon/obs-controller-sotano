<script>
    import { onMount } from 'svelte';
    import SquareButton from '../square_button/index.svelte';
    export let title;
    export let buttonTitles;
    export let activeIndex;
    export let onClick;
    export let buttonSize = 80;

    onMount(async () => {});

</script>

<div class="main">
    <h3 >{title}</h3>
    <div class="line"></div>
    <div class ="section">
        {#each buttonTitles as text, i}
            <SquareButton 
                title = {text} 
                onClick = {()=> onClick(i)} 
                isActive = {activeIndex == i} 
                height = {buttonSize} 
                width = {buttonSize}
            />
        {/each}
    </div>
</div>
<style>
    .main{
        width: 100%;
        color: white;
    }
    h3{
        padding-left: 10px;
    }
    .line{
        width: 95%;
        height: 2px;
        background-color: white;
        margin-left: 10px;
        margin-bottom: 10px;
    }
    .section{
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: space-around;
    }
</style>