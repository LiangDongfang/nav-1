const $siteList = $('.siteList')
const $lastLi = $('.lastSite')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
  { logo: 'A', url: 'http://www.acfun.cn' },
  { logo: 'B', url: 'http://www.bilibili.com' }
]

const simplifyUrl = (url) => {
  return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '')
}

//通过修改hashMap来操作页面
const render = () => {
  $siteList.find('li:not(.lastSite)').remove()
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
    <div class="site">
      <div class="logo">${node.logo}</div>
      <div class="link">${simplifyUrl(node.url)}</div>
      <div class="close">
        <svg class="icon">
          <use xlink:href="#icon-close"></use>
        </svg>
      </div>
    </div>
  </li>`).insertBefore($lastLi)
    $li.on('click', () => {
      window.open(node.url)
    })
    $li.on('click', '.close', (e) => {
      console.log('这里')
      e.stopPropagation() //阻止冒泡
      hashMap.splice(index, 1)
      render()
    })
  })
}
render()
$('.addButton')
  .on('click', () => {
    let url = window.prompt('请问你要添加的网址是啥？')
    if (url.indexOf('http') !== 0) {
      url = 'https://' + url
    }
    hashMap.push({
      logo: simplifyUrl(url)[0].toUpperCase(),
      url: url
    })
    render()
  })

//页面离开时把添加的网址保存到local Storage
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap)
  localStorage.setItem('x', string)
}

//按下键盘打开网址
$(document).on('keypress', (e) => {
  // const key = e.key
  const { key } = e
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url)
    }
  }
})