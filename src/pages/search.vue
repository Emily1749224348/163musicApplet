<script setup lang="ts">
import {ref,toRef,reactive,watch} from "vue"
import Header from "@/components/Header.vue"
import {useRouter} from "vue-router"
import {getSearchHotDetail ,getSearch} from "@/service/requests"
import { onMounted } from "vue";
import {getSearchSuggest} from "@/service/requests"
//-----------路由跳转
const router = useRouter();
function back(){
    router.back();
}
function goToPlaymusic(id){
    router.push({path:"/playmusic",query:{id:id}})
}

//---------------获取热搜榜
let searchHot = ref([]);

onMounted(async()=>{
    let result = await getSearchHotDetail();
    // console.log(result);
    if(result.data.code===200){
        searchHot.value = result.data.data;
    }
})

//--------------------搜索词
let Search = reactive({
    ifSearch:false,//是否正在搜索，这决定main区域内容
    keywords:"",
    type:'',//提示还是结果 suggest result
});

//-----------------按下搜索键、点击热搜内容、点击搜索提示
let searchResult = ref([]);
async function onSearch(){
    Search.type='result';
    suggest.value = [];
    // console.log(suggest.value);
    let result =await  getSearch({keywords:Search.keywords})
    // console.log(result);
    searchResult.value = result.data.result.songs;
    // console.log(searchResult.value);
}
//------------输入内容 展示搜索建议
let suggest = ref([]);

watch(()=>Search.keywords,
async (val)=>{
    if(val){
        Search.ifSearch  = true;
        // await searchSuggest();        
    }else{
        Search.ifSearch = false;
        suggest.value = [];
        Search.type='';
    }
})

async function searchSuggest(){
        Search.type='suggest';
        let result = await getSearchSuggest({keywords:Search.keywords,limit:5});
        console.log(result);
        // console.log(result);
        suggest.value = result.data.result.songs;
        // console.log(suggest.value);
}
//-------------输入框失去焦点
function offfocus(){
    if(Search.keywords==''){
        Search.ifSearch = false;
        suggest.value = [];
        Search.type='';
    }
}
</script>
<template>
    <header>
        <Header title="搜索" @back="back"/>
        <van-search class="search gray-200"
         placeholder="搜索内容" :autofocus="true"
         @blur = "offfocus"
         @input = "searchSuggest"
         @search="onSearch"
         v-model="Search.keywords"/>
    </header>
    
    <main>
        <div class="search" v-if="Search.ifSearch"> 
            <p class="keywords"> 搜索:"{{ Search.keywords }}"</p>
            <Suspense>
                <template #default>
                    <section>
     <!-------------------搜索提示 -->
                 <div v-if="Search.type=='suggest'">
                    
                    <div class="suggest" v-for="(item,index) in suggest"
                    @click="onSearch" :key="index">
                    <van-icon name="search" size="20px" color="gray"/>
                     {{ item.name }}
                    </div>
                </div>
     <!-------------------搜索结果 -->
                <div v-if="Search.type=='result'">
                    <div v-for="item in searchResult"
                    :key="item.id" 
                    class="searchResult"
                    @click="goToPlaymusic(item.id)">
                        <div><h3>{{ item.name }}</h3>
                         <p>{{item.ar[0].name}} - {{ item.al.name }}</p>
                        </div>
                        <van-icon color="gray"
                        size="25px" name="play-circle-o"></van-icon>
                    </div>
                </div>   
                </section>
                </template>
                
                
                <template #fallback>
                    加载中...
                </template>
            </Suspense>
        </div>
        <!-- ------- ------- --------热搜榜 ----------- - ---- -- - - - -->
        <div v-else>
            <Suspense>
                <template #default>
                    <div>
                  <p>热搜榜</p>
                <div class="searchHot"
                    v-for="(item,index) in searchHot" :key="index"
                    @click.prevent="Search.keywords=item.searchWord;onSearch()">
                <div class="index"><h3 >{{ index+1 }}</h3></div>
                <div class="content"><h3>{{ item.searchWord }}</h3>
                <p >{{ item.content }}</p> </div>
                <div class="score">{{ item.score }}</div>
                </div>   
                </div>
                </template>
                
            <template #fallback>加载中</template>
            </Suspense>
            
        </div>
    </main>

</template>

<style lang="scss">

.van-field{
    border-radius:10px;
}

.search{
        border-radius:50px;
}

main{
    width:100vw;
    overflow-x:hidden ;
    .search{
        padding:0 10px;
    }
      /*************搜索建议 */
    .keywords{
        color:blue;
    }
    .suggest{
        display:block;
        padding: 0 10px;
        height:30px;
        // border:1px red solid;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        color:rgb(94, 94, 94);
        font-size:18px;
        margin-bottom:2px;
    }
    /*******************搜索结果 */
    
   
    .searchResult{
        display:flex;
        justify-content: space-between;
        height:50px;
        margin:2px 0;
        box-sizing: border-box;
        align-items: center;
        text-overflow: ellipsis;
        overflow: hidden;
        div{
            box-sizing:border-box;
           h3{
            font-size:large;
            line-height:25px;
            display: block;
            height:25px;
            overflow: hidden;
            text-overflow:ellipsis;
            }
            p{
            color:gray;
            line-height:25px;
            display:block;
            height:25px;
            overflow: hidden;
            text-overflow:ellipsis;
            } 
            
        }
        
    }
    
    /**************热搜榜单 */
    .searchHot{
        display: flex;
        width:100vw;
        justify-content:space-between;
        height:60px;
        .index{
            width:10vw;
            text-align: center;
            line-height:60px;
            font-size:20px;
            color:gray;
        }
        .content{
            width:70vw;
            display: flex;
            flex-direction: column;
            h3{
                font-size:20px;
                font-weight:600;
                width:100%;
            }
            p{
                color:gray;
                width:100%;
                max-height: 25px;
                line-height:28px;
            }
            overflow:hidden;
            text-overflow: clip;
        }
        .score{
            width:20vw;
            color:rgb(183, 182, 182);
        }
    }
}
</style>