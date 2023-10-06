import {createRouter, createWebHashHistory} from "vue-router"
import index from "@/pages/index.vue"
import search from "@/pages/search.vue"
import toplist from  "@/pages/toplist.vue"
import playmusic from "@/pages/playmusic.vue"
export const routes = [
    {
        path:'/',
        name:"index",
        component:index,
    },
    {
        path:"/search",
        name:"search",
        component:search,
    },
    {
        path:"/toplist",
        name:"toplist",
        component:toplist,
    },
    {
        path:"/playmusic",
        name:"playmusic",
        component:playmusic,
    }
]


const router =createRouter({
    // scrollBehavior :()=>({left:0,top:0}),
    history:createWebHashHistory(),
    routes,
})

export default router