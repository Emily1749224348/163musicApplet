<script lang="ts" setup>
// import SearchBox from "@/components/SearchBox.vue"
import {useRouter} from "vue-router"
import { onMounted, ref,toRef} from "vue";
import { getToplist } from "@/service/requests";

import { setgroups } from "process";
import { Ref } from "vue";

interface NewObj{
    value:any
}
//---------------路由跳转---------------
const router = useRouter();
function goToSearch():void{
    router.push({path:"/search"})
}
function goToToplist(id){
    router.push({path:"/toplist",query:{id:id}})
}

let toplists = ref({});

let isLoading = ref(true);//判断加载状态的变量
onMounted(async ()=>{
    let result = await getToplist();
    
    toplists.value=await result.data.list.slice(0,4);
   
    isLoading.value = false;
})


</script>
<template>
    <Suspense>
        <template #default v-if="!isLoading">
           <div>
            <header>
            <h1 class="title">网易云音乐</h1>
        </header>     
            <main>
            <van-search placeholder="搜索内容" @focus="goToSearch()"/>
            
            <section>
                <van-card class="card"
                   v-for="item of toplists"
                    :key="item.id"
                   @click="goToToplist(item.id)"
                    :desc="item.description"
                    :title="item.name"
                    :thumb="item.coverImgUrl"/>      
               
            </section>
            </main> 
            
        </div> 
       
        </template>
        <template #fallback v-else>
            
            <van-skeleton title :row="3" />
        </template>
    </Suspense>
       
</template>
<style lang="scss">
header{
    .title{
        font-size:20px;
        text-align:center;
    }
}
</style>