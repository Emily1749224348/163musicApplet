<script setup lang="ts">
import useStore from "@/store/index"
import { onMounted } from "vue";
import { defineProps,computed } from "vue";
import {formatDate} from "@/plugins/utils"
let {comments} = defineProps( {comments:{type:Array, default:[]}} )
const store = useStore();

//
let showDate = function(val){
    let date = new Date(val);
    return formatDate(date,'yyyy-MM-dd')
}


onMounted(async ()=>{

})
</script>
<template>
    <div id="comment">

   
    歌曲评论
    <div class="commentItem" 
    v-for="(item,index) in comments" :key="index">
        <!--头像  -->
    <div class="commentCreatorAvatar">
            <img :src="item.user.avatarUrl+
            '?param=100y100'" alt="" >
        </div>

        <div class="commentMain">
            <div class="commentContent">
                <div>
                    <!-- 名字和评论 -->
                    <div class="nameAndTime">
                        <span class="commentUserNickName">{{ item.user.nickname }}</span>
                        
                        <span class="commentCreatedTime">
                        {{ showDate(item.time ) }}
                        </span> 
                    </div>
                    <!-- 点赞键 -->
                    <div class="commentButton">
                        <img src="../assets/img/点赞.png" width="20" height="20"> 
                        <div>{{ item.likedCount }}</div>
                    </div>
                </div>
                
                <div>{{ item.content }}</div>
            </div>
        </div>

    </div>
    <div>更多评论请打开网易云APP</div>
   <!-- 评论区大框，结束 -->
   </div>
</template>
<style lang="scss">

.commentItem{
    display:flex;
    margin: 5px 0;
    padding:10px 0 20px;
    border-bottom:1px solid #eee;
    font-size:12px;
    width:100vw;
    .commentCreatorAvatar{
        width:35px;
        height:35px;
        margin:0 10px 0 0;
        img{
            width:100%;
            border-radius:50%;
            
        }
    }
    .commentMain{
        width:calc(100vw - 60px);
        .commentContent{
           
            div{
                display:flex;
                justify-content: space-between;
                align-items: center;
                .nameAndTime{
                    display: flex;
                    flex-direction: column;
                    div{
                        margin:0;
                    }
                    .commentUserNickName{
                        color:#5a8ab9;
                        display: block;
                    }
                    .commentCreatedTime{
                        color:rgb(167, 167, 167);
                        display:block;
                    }
                  
                }
            }
        }
    }

}


</style>