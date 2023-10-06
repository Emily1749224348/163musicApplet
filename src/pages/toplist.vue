<script lang="ts" setup>
import Header from "@/components/Header.vue"
import { onMounted,toRef,ref } from 'vue';
import { useRouter ,useRoute} from 'vue-router';
import {getToplistDetail} from "@/service/requests"

const router = useRouter();
const route = useRoute();
const toplistId = ref(route.query.id)
function back(){
    router.back();
}
//初始化 获取榜单信息
async function init(){
let re = await getToplistDetail(toplistId);
console.log(re);
}
</script>
<template>
    <header>
        <Header :title="route.query.id" @back="back"/>
        <section>
        
        </section>
    </header>
</template>