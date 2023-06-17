import { createRequire } from 'module'
const require = createRequire(import.meta.url)
let shell = require('shelljs')
let name = process.argv[2] || 'Auto-commit'
let exec = shell.exec

//检查控制台是否以运行`git `开头的命令
if (!shell.which('git')) {
  //在控制台输出内容
  shell.echo('Sorry, this script requires git')
  shell.exit(1)
}
if (exec('git add .').code !== 0) {
  echo('Error: Git add failed')
  exit(1)
}
if (exec(`git commit -am "${name}"`).code !== 0) {
  echo('Error: Git commit failed')
  exit(1)
}
if (exec('git subtree push --prefix docs/public origin docs').code !== 0) {
  echo('Error: Git commit failed')
  exit(1)
}
