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
  } else {
    shell.echo(`The ${item} command can be run`)
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
command.forEach((item) => {
  if (shell.exec(item).code !== 0) {
    shell.echo(`Error: ${item} failed`)
    shell.exit(1)
  }
})

// //检查控制台是否以运行`git `开头的命令
// if (!shell.which('pnpm')) {
//   //在控制台输出内容
//   shell.echo('Sorry, this script requires pnpm')
//   shell.exit(1)
// }

// if (shell.exec('pnpm docs:build').code !== 0) {
//   shell.echo('Error: pnpm docs:build failed')
//   shell.exit(1)
// }

// //检查控制台是否以运行`git `开头的命令
// if (!shell.which('git')) {
//   //在控制台输出内容
//   shell.echo('Sorry, this script requires git')
//   shell.exit(1)
// }
// if (shell.exec('git add .').code !== 0) {
//   shell.echo('Error: Git add failed')
//   shell.exit(1)
// }
// if (shell.exec(`git commit -am "${name}"`).code !== 0) {
//   shell.echo('Error: Git commit failed')
//   shell.exit(1)
// }
// if (shell.exec('git push origin main').code !== 0) {
//   shell.echo('Error: Git push Branch main')
//   shell.exit(1)
// }
// if (
//   shell.exec('git subtree push --prefix docs/public origin docs').code !== 0
// ) {
//   shell.echo('Error: Git push Branch main')
//   shell.exit(1)
// }
