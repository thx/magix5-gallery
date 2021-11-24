const fs = require('fs')
const path = require('path')
function walkToObject(dirPath) {
  let data = {}
  const files = fs.readdirSync(dirPath)
  files.forEach(function (file) {
    // 忽略 index.js
    if (path.resolve(dirPath, file) === path.resolve(__dirname, file) && !fs.lstatSync(path.resolve(dirPath, file)).isDirectory()) {
      return
    }
    if (fs.lstatSync(path.resolve(dirPath, file)).isDirectory()) {
      data[file] = walkToObject(path.resolve(dirPath, file))
    } else {
      data[file] = fs.readFileSync(path.resolve(dirPath, file), 'utf-8')
    }
  })
  return data
}

let data = walkToObject(path.resolve(__dirname, './'))
module.exports = data