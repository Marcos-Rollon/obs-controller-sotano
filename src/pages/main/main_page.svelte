<script>
    /*
    Main page of the app. Creates a grid-like screen with several element that control
    all the essential functions of OBS in "el sótano"
    There are two big sections, the header, with audio an indicators, and the body.
    The body is defined by the array of objects in section_definition.js
    The array is like so:
        [
            {title: String, tiles: [Section]}
        ]
    The datatype [Section] is defined in section.js
    This object makes easy work of creating the UI, and we can reffer to it in a row,col coordinate
    system.
    To change scenes and do logic, we would normally be interested in the tiles, that we can
    easily get with some helper methods in main_page_controller
    There are also two modals that show errors and connection dialogs.

    Marcos Rollón Rivas August - 2021.
    */
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import MenuSection from "../../components/menu_section/menu_section.svelte";
    import SquareButton from '../../components/square_button/index.svelte';
    import ConnectionIndicator from '../../components/connection_indicator/connection_indicator.svelte';
    import ToggleImageButton from '../../components/toggle_image_button/toggle_image_button.svelte';
    import ToggleButton from '../../components/toggle_button_with_image/toggle_button_with_image.svelte';
    import Modal from '../../components/modal/modal.svelte'
    import mainPageController from "./main_page_controller.js";

    const HEADER_BUTTON_SIZE = 100; // Width of buttons in header. Height is 1.4 this ammount

    // State vars
    let activeRow = null;
    let activeCol = null;
    let speakerState = {scarlet: false, shure: false}
    let connectionState = false;
    let streamingState = false;
    let showErrorMsg = false;
    let showConnectionModal = false;
    let newServerIP = "";
    function onButtonClick(row, col){
        mainPageController.handleButtonClick(row,col)
            .catch(error => {
                mainPageController.showErrorMsg(error.error)
            })
    }
    
    onMount(async () => {
        mainPageController.isShureActive.subscribe(value => speakerState.shure = value)
        mainPageController.isScarletActive.subscribe(value => speakerState.scarlet = value)
        mainPageController.connectionState.subscribe(value => connectionState = value);
        mainPageController.showErrorMessage.subscribe(value => showErrorMsg = value);
        mainPageController.streamingState.subscribe(value => streamingState = value);
        mainPageController.showConnectionModal.subscribe(value => showConnectionModal = value);
        mainPageController.changeRowAndCol = (row, col) =>{
            activeRow = row;
            activeCol = col;
        }
        let coordinates = mainPageController.getCurrentSceneCoordinate();
        if(coordinates){
            activeRow = coordinates[0]
            activeCol = coordinates[1]
        }
        mainPageController.connectToOBS();
    });
    
    
</script>

<main>
    <header>
        <ToggleImageButton 
                imagePath="/assets/icons/wifi-off.svg"
                activeImagePath ="/assets/icons/wifi.svg"
                isActive = {connectionState}
                size = {HEADER_BUTTON_SIZE} 
                on:click={()=> mainPageController.connectionTapped()}
        />
        <ToggleButton 
                imagePath="/assets/icons/mute.svg"
                activeImagePath= "/assets/icons/mic.svg"
                height = {HEADER_BUTTON_SIZE*1.4} 
                width = {HEADER_BUTTON_SIZE}
                on:click={()=> mainPageController.toggleScarlet()}
                isActive={speakerState.scarlet}
                text="Scarlett"
        />
        <ToggleButton 
                imagePath="/assets/icons/mute.svg"
                activeImagePath= "/assets/icons/mic.svg"
                height = {HEADER_BUTTON_SIZE*1.4} 
                width = {HEADER_BUTTON_SIZE}
                on:click={()=> mainPageController.toggleShure()}
                isActive={speakerState.shure}
                text="Shure"
        />
        <ToggleImageButton 
                imagePath="/assets/icons/offline-streaming.svg"
                activeImagePath ="/assets/icons/live-streaming.svg"
                isActive = {streamingState}
                size = {HEADER_BUTTON_SIZE} 
                on:click={()=> mainPageController.streamingTapped(streamingState)}
        />
        
    </header>
    <div class="sections">
        {#each mainPageController.sections as section, i}
            <MenuSection 
                title= {section.title} 
                buttonTitles = {section.tiles.map((e)=> e.title)} 
                activeIndex = {activeRow == i ? activeCol : null}
                onClick= {(col) => onButtonClick(i, col)}
                buttonSize = {window.innerWidth/8}
            />
        {/each}
    </div>
    {#if showErrorMsg}
        <Modal on:close = "{() => mainPageController.hideErrorMsg()}">
            <h2 slot = "header">Ups!</h2>
            <p>{mainPageController.errorMessage}</p>
        </Modal>
    {/if}
    {#if showConnectionModal}
    <div transition:fade>
        <Modal on:close = "{() => mainPageController.hideConnectionDialog()}">
            <h2 slot = "header">Introduce los detalles de la conexión</h2>
            <input type="text" placeholder="ip servidor" bind:value={newServerIP}>
            <button on:click={mainPageController.changeServerIP(newServerIP)}>Cambiar</button>
        </Modal>
    </div>
    {/if}
</main>

<style>
	main{
		display: flex;
        flex-direction: column;
        padding: 40px 0 40px 0;
		justify-items: center;
		align-items: center;
        justify-content: center;
        color: white;
        overflow: hidden;
	}
    header{
        display: grid;
        width: 90%;
        margin-left: 10px; 
        grid-template-columns: 1fr 3fr 3fr 1fr;
        grid-template-rows: 1fr;
        align-items: center;
        justify-items: center;
    }
    .sections{
        display: flex;
        width: 90%;
        flex-direction: column;
		justify-items: center;
		align-items: center;
        justify-content: center;
    }
</style>