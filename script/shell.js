import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const minimist = require('minimist')
const shell = require('shelljs')

const argv = minimist(process.argv)
const commitInfo = 'Auto-commit'

const envList = ['pnpm', 'git']
//检查控制台是否以运行对应的命令
envList.forEach((item) => {
  if (!shell.which(item)) {
    shell.echo(`Sorry, this script requires ${item}`)
    shell.exit(1)
  }
})

const command = [
  'pnpm docs:build',
  'git add .',
  `git commit -am ${argv.commit ? argv.commit : commitInfo}`,
  'git push origin main',
  'git subtree push --prefix docs/public origin docs'
]
// 执行脚本
for (let index = 0; index < command.length; index++) {
  const element = command[index]
  if (shell.exec(element).code !== 0) {
    //在控制台输出内容
    shell.echo(`Error: ${element} failed`)
    shell.exit(1)
  }
}
