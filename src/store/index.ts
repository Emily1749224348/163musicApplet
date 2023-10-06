import {defineStore} from "pinia"

const state=()=>{
    return {
       isPlay:false,
       musicId:"",
       currentTime:"",
    }
}
export default defineStore({
    id:'store',
    state,
    getters:{

    },
    actions:{
        changePlayState(status = false){
            this.isPlay = status;
        },
        updateMusicId(musicId){
            this.musicId = musicId;
        },
        updateCurrentTime(time){
            this.currentTime = time;
        }
    }
});
