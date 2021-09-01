import obsService from "../../features/obs_control/obs_control_service.js";
import * as SOURCES from "../../config/sources.js";
import SECTIONS from "./section_definition";
import { writable } from "svelte/store";

/*
    Controller for the main page. We use this class to comunicate with the obs service.
    There are some helper functions, and mostly writable stores, that are the normal way
    for svelte apps to share state reactively.
*/


class MainPageController{
    constructor(){
        this.sections = Array.from(SECTIONS);
        // Definition of stores to comunicate with the UI
        this.isShureActive = writable(false);
        this.isScarletActive = writable(false);
        this.connectionState = writable(false);
        this.streamingState = writable(false);
        this.showErrorMessage = writable(false);
        this.showConnectionModal = writable(false);
        this.errorMessage = "";
        this._activeScene = this.sections[3].tiles[2]; // Loading Scene
        // Callback function to tell the UI to change row and col
        this.changeRowAndCol;
    }
    // Get the mute/unmute state of the audio sources and changes the icons
    _getAudioSourcesState(){
        obsService.getSourceMute(SOURCES.SHURE_SOURCE).then((response)=>{
            if(response.status == "ok"){
                this.isShureActive.set(!response.muted);
            }
        });
        obsService.getSourceMute(SOURCES.SCARLETT_SOURCE).then((response)=>{
            if(response.status == "ok"){
                this.isScarletActive.set(!response.muted);
            }
        });
    }
    // Gets if the audio sources are in this scene and changes the icons.
    _getAudioSourcePresence(){
       obsService.getCurrentScene()
        .then(scene =>{
            const out = this._isAudioInScene(scene);
            this.isScarletActive.set(out.scarlet);
            this.isShureActive.set(out.shure);
        }) 
        .catch(error =>{
            console.error("Can't get current scene");
            console.error(error)
        })
    }

    /*
    Uses the service to connect to OBS and assing all the necesary events and callbacks
     */
    connectToOBS(params){
        obsService.connect(params)
        .then(()=>{
            console.info("[OBSService] Connected to Obs")
            this._getAudioSourcePresence();
            obsService.goToScene(this.sections[3].tiles[2].id) // Loading scene as initial
        })
        .catch((error)=>{
            this.errorMessage = error.description;
            this.showErrorMessage.set(true)
        })
        // Callbacks assigment
        obsService.onSceneChanged = (scene) =>{
            // Change the current active scene
            const sceneID = scene["scene-name"];
            const coordinates = this._getSceneCoordinateByID(sceneID);
            if(coordinates){
                this.changeRowAndCol(coordinates[0], coordinates[1])
                this._activeScene = this.sections[coordinates[0]].tiles[coordinates[1]];
            }
            // Get the current sources to look for the audio
            const output = this._isAudioInScene(scene);
            this.isShureActive.set(output.shure);
            this.isScarletActive.set(output.scarlet)
        }
        obsService.onStreamStarted = () =>{this.streamingState.set(true);}
        obsService.onStreamStopped = () =>{this.streamingState.set(false);}
        obsService.onConnectionOpen = () =>{this.connectionState.set(true);}
        obsService.onConnectionClosed = () =>{this.connectionState.set(false);}
        obsService.onSourceMuteStateChanged = (response)=>{
            if(response.sourceName == SOURCES.SCARLETT_SOURCE){
                this.isScarletActive.set(!response.muted);
            }
            if(response.sourceName == SOURCES.SHURE_SOURCE){
                this.isShureActive.set(!response.muted);
            }
        }
    }

    // Direct UI Called functions

    async handleButtonClick(row, col){
        const section = this._getSectionFromCoordinate(row, col);
        return obsService.goToScene(section.id)
    }
    toggleScarlet(){
        obsService.toggleSourceVolume(SOURCES.SCARLETT_SOURCE);
    }
    toggleShure(){  
        obsService.toggleSourceVolume(SOURCES.SHURE_SOURCE);
    }
    hideErrorMsg(){
        this.showErrorMessage.set(false)
        this.errorMessage = "";
    }
    showErrorMsg(text){
        this.errorMessage = text;
        this.showErrorMessage.set(true);
    }
    streamingTapped(isLive){
        isLive ? obsService.stopStream() : obsService.startStream();
    }
    connectionTapped(){
        if(obsService.isConnected)return;
        this.showConnectionDialog();
    }
    showConnectionDialog(){
        this.showConnectionModal.set(true);
    }
    hideConnectionDialog(){
        this.showConnectionModal.set(false);
    }
    changeServerIP(newIP){
        if(!newIP) return;
        // TODO:
        console.log(newIP)
    }

    // Helper to check in an scene the pressence of audio sources
    // returns {scarlet: bool, shure: bool}
    _isAudioInScene(scene){
        const sources = scene["sources"];
        const elements = sources.filter(element => element.name == SOURCES.SCARLETT_SOURCE || element.name == SOURCES.SHURE_SOURCE)
        let output = {scarlet: false, shure : false};
        if(elements.length > 0){
            elements.map(element =>{
                if(element.name === SOURCES.SCARLETT_SOURCE){
                    output.scarlet = true;
                }
                if(element.name === SOURCES.SHURE_SOURCE){
                    output.shure = true;
                }
            })
        }
        return output;
    }
    
    // Returns the current scene row and col
    getCurrentSceneCoordinate(){
        return this._getSceneCoordinate(this._activeScene.title);
    }
    // Helpers
    _getSectionFromCoordinate(row, col){
        return this.sections[row].tiles[col];
    }
    _getSceneCoordinate(sceneID){
        for(let i = 0; i< this.sections.length; i++){
            let tiles = this.sections[i].tiles;
            let founded = tiles.findIndex(element => element.title == sceneID);
            if(founded >= 0){
                return [i, founded]
            }
        }
        return null;
    }
    _getSceneCoordinateByID(sceneID){
        for(let i = 0; i< this.sections.length; i++){
            let tiles = this.sections[i].tiles;
            let founded = tiles.findIndex(element => element.id == sceneID);
            if(founded >= 0){
                return [i, founded]
            }
        }
        return null;
    }

}

const controller = new MainPageController();

export default controller;

