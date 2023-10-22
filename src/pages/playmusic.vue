<script setup lang="ts">
import { useRouter ,useRoute} from 'vue-router';
//歌曲图片封面，滚动效果
import AudioMusic from "@/components/AudioMusic.vue"
//评论
import comments from "@/components/comments.vue"
//通用头
import Header from "@/components/Header.vue"
//歌词滚动
import LyricsScroll from "@/components/LyricsScroll.vue"
import { onMounted ,ref ,reactive,toRef} from 'vue';
import useStore from "@/store/index"
import {getMusicUrl,getMusicDetail, getLyrics,getComments} from "@/service/requests"
// 提示
import { showDialog} from 'vant';
 //   路由跳转
const router = useRouter();
const route = useRoute();
function back(){
    router.back();
}

//状态管理库
const store = useStore();
//初始化   自动播放音乐
let music  = reactive({
    url:"",
    name:"",
    detail:{},
});
//拿到歌词，处理歌词
//异步加载组件lyric
let lyricFlag = ref(0);
let lyric = reactive([]);
async function handleLyric(){
    let res = await  getLyrics(store.musicId);
    // console.log(result);
    let lyrics = res.data.lrc.lyric;
    /**对获取到的歌词进行处理 */
    let arr=lyrics.split('\n');
    let array= [];
    let time = "";
    let value = "";
    let result=  [];
    //去除空行
    arr.forEach(item=>{
        if(item!=""){
            array.push(item);
        }
    });
    //把时间值重新组装成以秒为单位的
    arr.forEach(item=>{
        time = item.split("]")[0];
        value = item.split("]")[1];
        //去掉时间里的中括号得到 xx:xx.xx
        let t = time.slice(1).split(":");
        result.push([parseInt(t[0],10)*60+parseFloat(t[1]),value]);
    })
    lyric = result;
    lyricFlag.value = 1;
}
//背景样式
function handleBackground(){
    let body = document.getElementById("body");
    console.log("body");
    body.style.background = 'url('+music.detail.al.picUrl+')';

    // body.style.backdropFilter = 'blur(50px) brightness(25%)';
    // backdrop-filter: blur(50px) brightness(25%);
}

//初始化
async function init(){
    //更新播放状态
    await store.changePlayState(true);
    //上传音乐id
    await store.updateMusicId(route.query.id);
    //获取音乐播放的url
    let re = await getMusicUrl(store.musicId);
    // console.log(re);
    music.url = await re.data.data[0].url;
    if(!music.url){
        showDialog({
            message:'请前往网易云APP播放'
        })
    }
    // console.log("music url");
    // console.log(music.url);
    //获取歌曲详情
    let re2 = await getMusicDetail(store.musicId);
    music.detail =await re2.data.songs[0];
    console.log(music.detail);
    console.log(music.detail.al.picUrl);
    //设置背景
    await handleBackground();
    //获取歌词
    await  handleLyric();
    // console.log(lyric);
    //获取评论
    handleComments();
}

/*******************评论 */
let commentsFlag = ref(0);
let musicComments = reactive([]);
async function handleComments(){
    let re = await getComments(store.musicId);
    
    musicComments = re.data.hotComments;
    commentsFlag.value = 1;
}

//分享面板
let showShare = ref(false)
const options = [
    {name:"微信",icon:"wechat"},
    {name:"朋友圈", icon:"wechat-moments"},
    {name:"微博",icon:"weibo"},
    {name:"复制链接",icon:"link"},
    {name:"QQ", icon:"qq"},
]
onMounted(async ()=>{
   await init(); 
    
})
</script>
<template>
    <Suspense>
        <template #default>
            <div id="body">
              <div class="playmusic">
                <Header :title="music.detail.name" @back="back"/>
                <!-- 旋转碟片 -->
                <AudioMusic 
           
                v-if="music.detail"
                :detail="music.detail"
                :musicUrl="music.url" 
           
                />
                <!-- 滚动歌词 -->
                <template v-if="lyricFlag==1">
                <LyricsScroll v-if="lyric" :lyric="lyric"/>
                </template>
            <!-- <LyricsScroll v-if="lyric" :lyric="lyric"/> -->
                <section class="bottom">
                <a href="#">在网易云音乐查看更多歌词</a>
                <div class="share" @click="showShare=true">分享给微信好友</div>
                <van-share-sheet 
                v-model:show="showShare"
                :options="options"/>
            </section>   
            <!-- 评论区 -->
            <section v-if="commentsFlag">
                <comments :comments="musicComments"/>
            </section>
            
            </div>  
            </div>
            
        </template>
       
        <template #fallback>
            加载中...
        </template>
    </Suspense>
</template>
<style lang="scss">

.playmusic{
    /* background-color:black; */
    /* color:white; */

    height:100vh;
    overflow: scroll; 
    /**毛玻璃效果 */
    // backdrop-filter: blur(50px) brightness(25%);
    backdrop-filter: blur(50px) brightness(30%);
    *{
        color:white;
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
}
</style>