import Section from "./section.js";
import * as SCENES from "../../config/scenes"

const _sections = [
    {   
        title: "Canciones", 
        tiles: [
            new Section("1", SCENES.SONG_1),
            new Section("2", SCENES.SONG_2),
            new Section("3", SCENES.SONG_3),
            new Section("4", SCENES.SONG_4),
            new Section("5", SCENES.SONG_5),
            new Section("6", SCENES.SONG_6),
            new Section("7", SCENES.SONG_7),
        ],
    },
    {
        title : "Backstage",
        tiles: [
            new Section("1", SCENES.BACKSTAGE_1),
            new Section("2", SCENES.BACKSTAGE_2),
            new Section("3", SCENES.BACKSTAGE_3),
            new Section("4", SCENES.BACKSTAGE_4),
            new Section("5", SCENES.BACKSTAGE_5),
            new Section("6", SCENES.BACKSTAGE_6),
            new Section("7", SCENES.BACKSTAGE_7),
        ],
    },
    {
        title : "Videos",
        tiles: [
            new Section("1", SCENES.VIDEO_1),
            new Section("2", SCENES.VIDEO_2),
            new Section("3", SCENES.VIDEO_3),
            new Section("4", SCENES.VIDEO_4),
            new Section("5", SCENES.VIDEO_5),
            new Section("6", SCENES.VIDEO_6),
            new Section("7", SCENES.VIDEO_7),
        ],
    },
    {
        title: "Misc.",
        tiles: [
            new Section("CÁMARA PRINCIPAL", SCENES.MAIN_CAMERA_NO_OVERLAY),
            new Section("CÁMARA BACKSTAGE", SCENES.BACKSTAGE_CAMERA_NO_OVERLAY),
            new Section("LOADING", SCENES.LOADING),
        ]
    }
]

export default _sections;