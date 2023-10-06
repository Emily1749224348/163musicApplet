import api from "./index"
//获取歌曲榜单
export async function getToplist(){
    return api.get("/toplist");
}
//获取热搜榜
export async function getSearchHotDetail(){
    return api.get("/search/hot/detail");
}
//搜索建议
export async function getSearchSuggest(params){
    return api.get("/cloudsearch",{params});
}

export async function getSearch(params){
    return api.get("/cloudsearch",{params});
}
//检查音乐是否可用
export function checkMusic(id){
    return api.get("/check/music",{params:{id:id}});
}
//获取音乐url
export function getMusicUrl(id){
    return api.get("/song/url",{params:{id:id}});
}
//获取歌曲详情
export function getMusicDetail(id){
    return api.get("/song/detail",{params:{ids:id}});
}
//获取歌词
export function getLyrics(id){
    return api.get("/lyric",{params:{id:id}});
}
//获取歌曲评论
export function getComments(id){
    return api.get("/comment/music",{params:{id:id,limit:10}})
}

//获取榜单详情
export function getToplistDetail(id){
    return api.get("/top/list",{params:{id:id}})
}
