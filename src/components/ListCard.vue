<script setup lang="ts">
import { onMounted ,toRef} from 'vue';
import { defineProps } from 'vue';
let {list} = defineProps({list:Object,})
onMounted(async()=>{
    console.log(list)
})
</script>
<template>
    <keep-alive>
     <div class="list">
      <van-card
        class="card"
        :desc="list.description"
        :title="list.name"
        :thumb="list.coverImgUrl"
        />
       
    </div>   
    </keep-alive>
    
</template>
<style scoped lang="scss">

</style>