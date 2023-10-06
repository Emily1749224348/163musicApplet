import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//自动加css前缀，适应不同浏览器
import autoprefixer from 'autoprefixer'
//样式库
import WindiCSS from 'vite-plugin-windicss'
//移动端组件库，自动*按需*引入
// import Components from 'unplugin-vue-components/vite';
// import {VantResolver} from '@vant/auto-import-resolver'
//路径别名


// import {
//   createStyleImportPlugin,
//   AndDesignVueResolve,
//   VantResolve,
//   ElementPlusResolve,
//   NutuiResolve,
//   AntdResolve,
// } from 'vite-plugin-style-import'

import {resolve} from "path"
// https://vitejs.dev/config/
export default defineConfig({ 
  css:{
    postcss:{
      plugins:[
        autoprefixer({
          overrideBrowserslist:['Chrome > 40', 'ff > 31', 'ie 11'],
        }),
        
      ]
    }
  },
  plugins: [
    vue(),
    WindiCSS(),
    // Components({
    //   resolvers: [VantResolver()],
    // }),
    // styleImport({
    //   resolves:[VantResolve()],
    //   libs:[{
    //     libraryName:'vant',
    //     esModule:true,
    //     resolveStyle:name=>`../es/${name}/style`
    //   }]
    // }),
    // createStyleImportPlugin({
    //   resolves:[AndDesignVueResolve()],
    //   libs:[
    //     {
    //       libraryName:'ant-design-vue',
    //       esModule:true,
    //       resolveStyle:name=>{return `ant-design-vue/es/${name}/style/index`}
    //     }
    //   ]
    // })
  ],
  resolve:{
    alias:[{find:'@',
    replacement:resolve(__dirname,'src')}],
    extensions:[".ts",".js",".mjs"],
  },
})
