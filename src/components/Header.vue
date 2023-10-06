<script setup lang="ts">
import { defineProps  } from 'vue';
import {useRouter} from "vue-router"
const router = useRouter()

const props = defineProps(['title'])
const emit = defineEmits(['back'])
function home(){
    router.push({path:"/"})
}
function back(){
    emit('back');
}
</script>
<template>
    <div class="header">
        <div class="buttons"> 
            <van-icon name="arrow-left" size="24px" @click="back"/>
            <van-icon name="wap-home" size="24px"
            @click="home()"/>
        </div>        
        <h1 class="title" style="display:inline-block">{{ props.title }}</h1>
    </div>
</template>
<style lang="scss">
.header{
    width:100vw;
    height:5vh;
    min-height:40px;
    box-sizing:border-box;
    padding:10px 0;
    display: flex;
    // border:1px solid salmon;
    align-items: center;
    .title{
        width:100vw;
        font-size:24px;
        font-weight:600;
        display: block;
        text-align: center;
        line-height: 100%;
        // border:1px black solid;
    }
    .buttons{ 
    position: absolute;
    width:100px;
    height:28px;
    border: 1px gray solid;
    border-radius:50px;
    display:inline-flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-around;
    background:rgba(218, 213, 213, 0.831);
    opacity: .8;
    .van-icon{
    color:#fff;
    }
    }
}

</style>