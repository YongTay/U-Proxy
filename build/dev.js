const fs = require('fs')
const path = require('path')
const spawn = require('child_process').spawn
const root = path.resolve(__dirname, '../')

console.log('根目录：', root)
const needToBuildDirs = ['packages/popup','packages/setting']
const projects = []

function listDir(dirPath) {
  const files = fs.readdirSync(dirPath)
  if(files.includes('package.json')) { // 如果存在package.json文件，表示是项目
    projects.push(dirPath)
  }
}

needToBuildDirs.forEach(dir => {
  const dirPath = path.resolve(root, dir)
  listDir(dirPath)
})

function runCmd(command, args, options) {
  return new Promise((resolve, reject) => {
    const cmd = spawn(command, args, options)
    cmd.stdout.on('data', (data) => {
      // console.log(`stdout: ${data}`);
    });

    cmd.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
      reject(data)
    });

    cmd.on('close', () => {
      resolve()
    });
  })
}
function build() {
  for (let i=0; i<projects.length; i++) {
    const pro = projects[i]
    runCmd('npm', ['run', 'dev'], { cwd: pro })
  }
}

build()
