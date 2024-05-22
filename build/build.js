const fs = require('fs')
const path = require('path')
const {run} = require("node:test");
const spawn = require('child_process').spawn
const root = path.resolve(__dirname, '../')

console.log('根目录：', root)
const needToBuildDirs = ['packages/popup','packages/setting', 'service']
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
function resolve(filepath, base = root) {
  return path.resolve(base, filepath)
}
async function build() {
  for (let i=0; i<projects.length; i++) {
    const pro = projects[i]
    console.log(`start to build ${pro}`)
    await runCmd('npm', ['run', 'build'], { cwd: pro })
    console.log(`${pro} build finished.`)
  }
  const dist = root + '/dist'
  const exists = fs.existsSync(dist)
  if (exists) {
    await runCmd('rm', ['-rf', dist])
  }
  await runCmd('mkdir', [dist])
  await runCmd('cp', ['-r', resolve('icon16.png', root), dist])
  await runCmd('cp', ['-r', resolve('icon48.png', root), dist])
  await runCmd('cp', ['-r', resolve('icon128.png', root), dist])
  await runCmd('cp', ['-r', resolve('manifest.json', root), dist])
  await runCmd('mkdir', ['-p', resolve('service', dist) ])
  await runCmd('cp', ['-r', resolve('service/dist', root), resolve('service', dist)])
  await runCmd('mkdir', ['-p', resolve('packages/popup', dist) ])
  await runCmd('cp', ['-r', resolve('packages/popup/dist', root), resolve('packages/popup', dist)])
  await runCmd('mkdir', ['-p', resolve('packages/setting', dist) ])
  await runCmd('cp', ['-r', resolve('packages/setting/dist', root), resolve('packages/setting', dist)])
  console.log('finish all build.')

}

build()
