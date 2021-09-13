/*
    放大镜功能
    只给第一张图放大

    克隆的那张图也需要
*/
var targetLi = document.querySelector('.swiper').children[0]
var magnifierPic = document.getElementById('magnifierPic')
var magnifierArea = document.getElementById('magnifierArea')
// 鼠标进入li
targetLi.onmouseover = handleMouseOver
// 克隆图片的处理
swiper.cloneFirstLi.onmouseover = handleMouseOver

// 当鼠标离开小黑框的时候
magnifierArea.onmouseout = function () {
    document.onmousemove = null
    magnifierPic.style.visibility = 'hidden'
    magnifierArea.style.visibility = 'hidden'
    // 开始图片的轮播
    swiper.mouseoverFlag = false
}

var liX = 0
var liY = 0
var liWidth = targetLi.offsetWidth
var liHeight = targetLi.offsetHeight
var magnifierWidth = magnifierArea.offsetWidth
var magnifierHeight = magnifierArea.offsetHeight
var bigPic = {
    width: 1350,
    height: 1350
} 
/*
    鼠标进入的时候,做相关数据的初始化(显示元素,获得坐标)
*/
function handleMouseOver (e) {
    // 图片会被移动,需要根据当前是哪一张
    var pos = {}
    if (swiper.imgIndex === 0) {
        pos = targetLi.getBoundingClientRect()
    } else if (swiper.imgIndex === swiper.imgCount - 1) {
        pos = swiper.cloneFirstLi.getBoundingClientRect()
    }
    var scroll = getScroll(e)
    liX = pos.left + scroll.scrollLeft
    liY = pos.top + scroll.scrollTop
    magnifierPic.style.visibility = 'visible'
    magnifierArea.style.visibility = 'visible'

    // 这里使用document，不能使用li,定位会挡住了
    document.onmousemove = handleMouseMove
}

function handleMouseMove (e) {
    var mouseX = parseInt(getPage(e).pageX)
    var mouseY = parseInt(getPage(e).pageY)
    var left = mouseX - liX - magnifierWidth/2
    var top = mouseY - liY - magnifierHeight/2
    if (left <= 0) {
        left = 0
    }
    if (top <= 0 ) {
        top = 0
    }
    if (left >= liWidth - magnifierWidth) {
        left = liWidth - magnifierWidth
    }
    if (top >= liHeight - magnifierHeight) {
        top = liHeight - magnifierHeight
    }
    magnifierArea.style.left = left + 'px'
    magnifierArea.style.top = top + 'px'

    var percentageX = parseInt(left / liWidth * bigPic.width)
    // console.log(percentageX)
    var percentageY = parseInt(top / liHeight * bigPic.height)
    // console.log(percentageY)
    // backgroundPosition的用法跟left，top类似，有负值的。
    magnifierPic.style.backgroundPosition = `-${percentageX}px -${percentageY}px`
    // 停止图片的轮播
    swiper.mouseoverFlag = true
    // magnifierPic.style.backgroundPositionX = percentageX + '%'
    // magnifierPic.style.backgroundPositionY = percentageY + '%'
}