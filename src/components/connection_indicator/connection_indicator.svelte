<script>
    export let status = false;
    export let size = 80;

    const activeImagePath = "/assets/icons/wifi.svg"
    const inactiveImagePath = "/assets/icons/wifi-off.svg"
    const _imagePaddingRatio = 0.8;
</script>

<div class="main" style="width: {size}px; height: {size}px" class:inactive={!status} >
    <img 
        src="{status ? activeImagePath : inactiveImagePath}"  
        style="width: {size *_imagePaddingRatio}px; height: {size *_imagePaddingRatio}px" 
        alt="network status indicator"
    >
</div>

<style>
    .main{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        border-radius: 50%;
        padding: 10px;
        background-color: #46f5c0;
    }
    .inactive{
        background-color: #D81159;
    }
</style>