import add from './hooks'
import image from './assets/21672674270_.pic.png'
import svgurl from './assets/ixintu.com.svg'
import word from './assets/word.txt'
import jpgDiy from './assets/31672674271_.pic.jpg'
import './style/index.css'
import './style/app.less'
import Arr from './assets/data.csv'
import Data from './assets/data.xml'
import toml from './assets/data.toml'
import yaml from './assets/data.yaml'
import json5 from './assets/data.json5'
import es6func from './project/babelLoader'
add()
es6func()
const img = document.createElement('img')
img.src = image
img.style.cssText = 'width:200px'
document.body.appendChild(img)

const svgimg = document.createElement('img')
svgimg.style.cssText = 'width: 200px'
svgimg.src = svgurl
document.body.appendChild(svgimg)

const text = document.createElement('div')
text.style.cssText = 'width:500px;height:500px;background:green'
text.classList.add('hello-bg')
text.textContent = word
document.body.appendChild(text)

const jpg = document.createElement('img')
jpg.style.cssText = 'width:300px;height:200px'
jpg.src = jpgDiy
document.body.appendChild(jpg)

document.body.classList.add('hello')

const iconfont = document.createElement('span')
iconfont.classList.add('icon')
iconfont.innerHTML = '凭'
document.body.appendChild(iconfont)

console.log(Arr,Data)

console.log(toml,toml.owner.name)
console.log(yaml)
console.log(json5)