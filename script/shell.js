/**
 * @description 自动化编译发布文档
 * @author lizhijie429
 * @param {String} commit - Git commit 命令参数，默认：'Auto-commit'
 * @param {String} origin - 远程仓库别名，默认：'origin'
 * @param {Boolean} docs - 远程仓库别名，默认：false
 */

import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const minimist = require('minimist')
const shell = require('shelljs')

const argv = minimist(process.argv)
const commitInfo = 'Auto-commit'
const originInfo = 'origin'

const envList = ['pnpm', 'git']
//检查控制台是否以运行对应的命令
envList.forEach((item) => {
  if (!shell.which(item)) {
    shell.echo(`Sorry, this script requires ${item}`)
    shell.exit(1)
  }
})

const command = {
  build: `pnpm docs:build`,
  add: `git add .`,
  commit: `git commit -am ${argv.commit ? argv.commit : commitInfo}`,
  pushMain: `git push ${argv.origin ? argv.origin : originInfo} main`,
  pushDocs: `git subtree push --prefix docs/public ${
    argv.origin ? argv.origin : originInfo
  } docs`
}
// 执行脚本
for (let index = 0; index < Object.keys(command).length; index++) {
  const key = Object.keys(command)[index]
  const value = command[key]
  if (argv['noBuild'] && key === 'build') {
    continue
  }
  // 如果传入参数 '--docs' 则执行打包及发布过程
  if (!argv['docs'] && (key === 'pushDocs' || key === 'build')) {
    continue
  }
  if (shell.exec(value).code !== 0) {
    //在控制台输出内容
    shell.echo(`Error: ${value} failed`)
    shell.exit(1)
  }
}
