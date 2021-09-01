import * as SERVER_SETTINGS from "../../config/obs_websocket_server";
import ObsWebSocket from "../../lib/obs-websocket.min.js"

/*
    Pretty basic abstraction over the obsWebSocket.js library.
    The helper property isConnected does what it says

    All methods return promises.
    There are several callbacks functions to comunicate with the client
    
    onSceneChanged(scene)
    onStreamStarted()
    onStreamStopped()
    onConnectionOpen()
    onConnectionClosed()
    onSourceMuteStateChanged(name)

    And they do what they look 
*/

class ObsControlService{
    constructor(){
        console.info("[OBSService] Init")
        this.obs = new ObsWebSocket()
        this._isConnected = false;
        this._assingEvents();
    }

    async connect(params){
        if (!params || params === undefined || params === null){
            params = {
                address: SERVER_SETTINGS.WEBSOCKET_SERVER_ADDRESS,
                password: SERVER_SETTINGS.WEBSCOKET_SERVER_PASSWORD,
            }
        }
        const promise = this.obs.connect(params)
        promise.then(()=> {
            this._isConnected = true;
        });
        return promise;
    }
    disconnect(){
        this.obs.disconnect();
    }
    get isConnected() {return this._isConnected};

    goToScene(name){
        return this.obs.send("SetCurrentScene", {'scene-name': name});
    }

    setSourceVolume(sourceName, volume){
        return this.obs.send("SetVolume", {source: sourceName, volume : volume})
    }
    muteSourceVolume(sourceName){
        return this.obs.send("SetMute", {source: sourceName, muted: true})
    }
    openSourceVolume(sourceName){
        return this.obs.send("SetMute", {source: sourceName, muted: false})
    }
    toggleSourceVolume(sourceName){
        return this.obs.send("ToggleMute", {source: sourceName})
    }
    getSourceMute(sourceName){
        return this.obs.send("GetMute", {source: sourceName});
    }
    getCurrentScene(){
        return this.obs.send("GetCurrentScene", {});
    }
    startStream(){
        return this.obs.send("StartStreaming", {});
    }
    stopStream(){
        return this.obs.send("StopStreaming", {});
    }

    _assingEvents(){
        this.obs.on('error', err=>{
            console.error("[OBSControlService] Unhandled error in obs websocket")
            console.error(err);
        })
        this.obs.on("SwitchScenes", scene => {this.onSceneChanged(scene);})
        this.obs.on("StreamStarted", () => this.onStreamStarted())
        this.obs.on("StreamStopped", () => this.onStreamStopped())
        this.obs.on('ConnectionOpened', () => this.onConnectionOpen());
        this.obs.on('ConnectionClosed', () => this.onConnectionClosed());
        this.obs.on("SourceMuteStateChanged", (name)=> this.onSourceMuteStateChanged(name));
    }
}


const service = new ObsControlService();

export default service;