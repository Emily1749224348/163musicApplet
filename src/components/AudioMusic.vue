<script setup lang="ts">
import {ref ,reactive,defineProps,watch} from 'vue' 
import useStore from "@/store/index"
import { onMounted } from 'vue';
import { Suspense } from 'vue';
import {useRoute} from "vue-router"
const route = useRoute();
const store = useStore();
const props = defineProps({musicUrl:String,
    detail:Object, picUrl:String})
//------操纵audio元素
const audioPlayer = ref(null);

//控制播放音乐
/**播放按钮的变换 */
let iconName = ref('pause-circle-o')

function changeState(){
    store.isPlay?pauseMusic():playMusic();
}
function playMusic(){
    document.getElementById('audio').play();
    iconName.value = 'pause-circle-o';
}

function pauseMusic(){
    document.getElementById('audio').pause();
    iconName.value = 'play-circle-o';
}

//播放音乐的时间更新
function timeupdate(){
    let time = document.getElementById('audio').currentTime;
    store.updateCurrentTime(time);

}


watch(()=>store.isPlay,async(val)=>{
    if(val){
        playMusic();
    }else{
        pauseMusic();
    }
})
onMounted(async()=>{

})
</script>
<template>
    <Suspense>
<div>
           <section class="play">
       <audio :src="props.musicUrl"
       id="audio"
       @play="store.changePlayState(true)"
       @pause="store.changePlayState(false)" 
       autoplay
       @timeupdate="timeupdate"
       @ended="pauseMusic()"
       ref="audioPlayer"
       />
       <div class="needle">
        <img  src="/src/assets/img/needle.png">
       </div>
       <div class="disc"
       :class="[store.isPlay?'discAnimation':'']"
       >
            <img v-if="props.detail.al" 
            :src="props.detail.al.picUrl" 
            class="musicAvatar"
            >
         
            <img src="../assets/img/disc.png" >
           
        </div>
         <van-icon class="play-icon" :name="iconName"
            color="#fff" size="55px"
            @click="changeState()" />
    </section>  
   
    
    </div>
     
       <template #fallback>加载中...</template>
    </Suspense>
      
</template>
<style>
/**动画关键帧 */
@keyframes disc{
        from{
            transform: rotate(0deg);
        }
        to{
            transform:rotate(360deg);
        }
        }

.play{
    width:100vw;
    margin:1vh 0;
    display:flex;
    flex-flow:column nowrap;
    align-items: center;
    /**指针 */
    .needle{
        display: block;
        position:relative;
        left:505;
        width:88px;
        height:72px;
        z-index:100;
        transform:rotate(22deg);
        img{
            width:100%;
        }
    }
    /**光碟 */
    .disc{
        margin-top:-20px;
        width:220px;
        height:220px;
        position:relative;

        /**歌曲封面图 */
        .musicAvatar{
            position:absolute;
            top:35px;
            left:35px;
            width:150px;
            z-index:-1;
        }
        /**碟片图 */
        img:nth-child(2){
            width:100%;
        }
       
       
    }
    /**碟子设置旋转动画 */
        .discAnimation {
        /*infinite动画无限循环 */
            animation: disc 20s linear infinite;
        /**动画延迟一秒 */
            animation-delay: 0.8s;
        }
    /**播放按钮 */
        .play-icon{
            position: relative;
            margin-top: -140px;
            height:140px;
        }    
}
.bottom{
    display: flex;
    flex-direction: column;
    align-items: center;
    a{
        text-decoration: underline;
    }
    .share{
        text-align:center;
        height:40px;
        line-height:40px;
        border: 1px solid black;
        width:10rem;
        border-radius:30px;
    }
}

</style>