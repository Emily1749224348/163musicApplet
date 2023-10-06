<script setup lang="ts">
import {ref,reactive} from "vue"
const searchText = ref("")
console.log(searchText);
function onSearch(){
    console.log(searchText);
}
</script>
<template>
<van-search v-model="searchText"
 placeholder="请输入搜索关键词"
 @search="onSearch" />

</template>