<script setup lang="ts">
import {ref, defineProps,watch} from 'vue'
import useStore from "@/store/index"
import { onMounted,nextTick } from 'vue';
import { onUpdated } from 'vue';
import { getLyrics } from '@/service/requests';
//父组件传来的prop为歌词数组,时间对应着歌词
let {lyric} = defineProps({lyric:{type:Array, default:[]}});
const store = useStore();
let placeholderHeight=0; 


// 当前歌词索引
let lyricsIndex = ref(0);

onUpdated(()=>{
    /*
    getCurrentLyricsIndex(store.currentTime);
    getLyrics(lyricsIndex);*/
})


/**监视歌词动态 */
// watch(()=>lyric,(current)=>{
//      console.log("new lyrics");
//     if(store.currentTime>1){//获取歌词时间大于1秒，需要进行校准
//         if(lyric.length>1){
//             getCurrentLyricsIndex(store.currentTime);
//             lyricScroll(lyricsIndex);
//         }

//     }
// })
/**监视音乐Id */
watch(()=>store.musicId,(current)=>{
   lyricsIndex.value=0;
})

//实现歌词滚动

async function lyricScroll(currentLyric){
    //获取歌词框
    let lyrics =document.getElementsByClassName("lyrics")[0];    
    //获取歌词item
    let lyricsArr = document.getElementsByClassName("lyricsItem");

    //placeholder的高度
    if(placeholderHeight == 0){
    placeholderHeight = lyricsArr[0].offsetTop-lyrics.offsetTop;
    }
    //歌词item在歌词框的高度  = 歌词框的offsetTop - 歌词item的offsetTop
    //console.log(currentLyric)
    if(lyricsArr[currentLyric.value - 1]){
    let distance = lyricsArr[currentLyric.value - 1].offsetTop - lyrics.offsetTop;
    nextTick(()=>{
        lyrics.scrollTo({
        behavior:"smooth",
        top: distance - placeholderHeight,
        }) 
    })
    }  
}
//获取当前歌词索引
async function getCurrentLyricsIndex(currentTime){
    let index  = 0;
    lyric.some(item=>{
        if(index <lyric.length-1){
            if(currentTime>item[0]){
                index ++;
            }
            return currentTime <=item[0];
        }
    })
    lyricsIndex.value =  index;
    //console.log(currentTime);
    // console.log(lyricsIndex);
}


/**监听当前播放时间 */
watch(()=> store.currentTime,
    async(currentTime, lastTime)=>{
    
    if((lastTime && Math.abs(currentTime-lastTime) >= 1) ||
    (lyricsIndex == 0 && lyric.length>1)
    ){
        //处理播放时间跳转时歌词位置的校准
        if(lyric.length>1){
            getCurrentLyricsIndex(currentTime);
            console.log(lyric[lyricsIndex])
            lyricScroll(lyricsIndex);
        }
    }

    if(lyricsIndex < lyric.length){
        if(currentTime >= lyric[lyricsIndex][0]){
            lyricsIndex++;
            lyricScroll(lyricsIndex);
       }
    }
    await getCurrentLyricsIndex(currentTime);
    await lyricScroll(lyricsIndex);
})

onMounted(async()=>{
    console.log('onMounted');
})

</script>
<template>
<div  class="lyrics" >
    <div class="placeholder"></div>
    <div class="lyricsItem"
      
        v-for="(item,index) of lyric"
        :key="index"
        :class="lyricsIndex - 1 == index ?'currentLyric':''">
       {{ item[1] }}
    </div>

    <div class="placeholder"></div>
</div>
</template>
<style lang="scss">
.lyrics{
    width:100vw;
    height:16vh;
    font-size:16px;
    text-align:center;
    overflow-y:scroll;
  //  border:1px solid blueviolet;
    &::-webkit-scrollbar{
        display:none;
    }
    .lyricsItem {
        margin:25px 20px;
        transition:all 0.5s;
        line-height:20px;
    }
    .currentLyric{
        font-weight:600;
        color:crimson;
        font-size:20px;
    }
    .placeholder{
        width:100vw;
        height:20%;
    //    border:1px solid green;
        box-sizing:border-box;
    }
}
</style>