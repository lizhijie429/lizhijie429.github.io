import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'WEB前端李志杰',
  description: 'A VitePress Site',
  outDir: './public',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '项目', link: '/project/index' },
      { text: '博客', link: '/article/index' },
      { text: '问题', link: '/problem/index' },
      {
        text: '个人主页',
        items: [
          {
            text: 'Git',
            link: 'https://github.com/lizhijie429'
          },
          {
            text: 'Gitee',
            link: 'https://gitee.com/lizhijie429'
          },
          {
            text: '掘金',
            link: 'https://juejin.cn/user/3966693685594589'
          }
        ]
      }
    ],
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/lizhijie429/lizhijie429.github.io'
      }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present lizhijie429'
    },
    search: {
      provider: 'local'
    }
  }
})
