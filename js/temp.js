// 轮播图
/*
    移动的动画
    参数1：移动的dom元素
    参数2：移动到哪个位置，px，这个值是负值，因为它是向左移动的
    整体移动思路:
    1、防止重复点击，导致速度加快的定时器处理
    2、判断移动的位置跟当前位置的关系，往左移动，要加负值，往右是加正值
    3、在定时函数中，判断当前距离与目标位置距离的绝对值，是否小于step绝对值,小于说明已经到了
*/

// 缩略图是有问题的写法
function moveAnimate(element, distance) {
    var time = 50
    var step = 20
    // 防止重复点击，导致速度加快
    if (element.timeFlag) {
        clearInterval(element.timeFlag)
        element.timeFlag = null
    }
    // 先确认好步进值，加还是减
    if (element.offsetLeft >= distance) {
        // 每隔30毫秒程序进来执行一次，第一次是负的，但是再进来一次就成正的，如此循环，所有需要加上绝对值，保证是负的
	 	// speed = -speed;这里或许跟闭包有关系，它是局部变量来着
        step = -Math.abs(step)
    }

    element.timeFlag = setInterval(function () {
        if (Math.abs(element.offsetLeft - distance) < Math.abs(step)) {
          element.style.left = distance + 'px'
          clearInterval(element.timeFlag)
          element.timeFlag = null
          return 
        }
        element.style.left = element.offsetLeft + step + 'px'
        // console.log(element.offsetLeft)
    }, time)
}

var swiper = {
    ul: null,
    imgIndex: 0,
    imgCount: 0,
    imgWidth: 0,
    switchTime: 2000
}
var lArrow = document.getElementById('l-arrow')
var rArrow = document.getElementById('r-arrow')

// 初始化克隆第一张图片, ul的宽度, 定位, 用img宽度, img数量
function _initSwiper() {
    var position = 'absolute'
    swiper.ul = document.getElementById('swiper-wrapper').children[0]
    // 克隆第一张图片
    var cloneFirstLi = swiper.ul.children[0].cloneNode(true)
    swiper.ul.appendChild(cloneFirstLi)

    // 先克隆再进行其他的操作
    var li = swiper.ul.children
    swiper.imgCount = li.length
    // 暂时没有考虑小数点的情况
    swiper.imgWidth = li[0].children[0].offsetWidth
    // console.log(swiper.imgCount, swiper.imgWidth)
    swiper.ul.style.width = swiper.imgWidth * swiper.imgCount + 'px'
    // 设置成绝对定位,使用的left
    swiper.ul.style.position = position

    // 图片的索引
    swiper.imgIndex = 0
    // 设置左右箭头
    rArrow.onclick = function () {
        // 判断当前是不是第六张（即是最后克隆的那一张）
        // 是的话，就需要把页面先重置回第一张，再继续其他的操作
        if (swiper.imgIndex === swiper.imgCount - 1) {
            swiper.ul.style.left = 0 + 'px'
            swiper.imgIndex = 0
        }
        swiper.imgIndex++
        moveAnimate(swiper.ul, -swiper.imgWidth*swiper.imgIndex)
    }
    lArrow.onclick = function () {
        // 判断当前是不是第一张,如果是的话要先拉到克隆的那一张去
        if (swiper.imgIndex === 0) {
            swiper.ul.style.left = -(swiper.imgCount - 1) * swiper.imgWidth + 'px'
            swiper.imgIndex = swiper.imgCount - 1
        }
        swiper.imgIndex--
        moveAnimate(swiper.ul, -swiper.imgWidth*swiper.imgIndex)
    }
    // 定时播放,就是直接去点击按钮就可以了
    var mouseoverFlag = false
    setInterval(function () {
        if (!mouseoverFlag) {
            // rArrow.click()
        }
    }, 2000)
    // 鼠标悬停的时候,不要轮播
    swiper.ul.onmouseover = function () {
        // console.log('hello')
        mouseoverFlag = true
    }
    swiper.ul.onmouseout = function () {
        // console.log('hello')
        mouseoverFlag = false
    }
}

function _initScroll() {
    var scrollId = document.getElementById('scrollId')
    // console.log(scrollId)
    var ul = scrollId.children[0]
    var liList = ul.children
    var imgCount = ul.children.length
    //兼容IE和火狐谷歌等的写法,获得外marign
    var computedStyle = 0
    if (window.getComputedStyle) {
        computedStyle = getComputedStyle(ul.children[1], null)
    } else {
        computedStyle = ul.children[1].currentStyle;//兼容IE的写法
    }
    // 打印的是px字符串
    // console.log(computedStyle.marginLeft)
    var liWidth = ul.children[0].offsetWidth + parseInt(computedStyle.marginLeft)
    // console.log(imgCount, liWidth * imgCount)
    ul.style.width = liWidth * imgCount + 'px'

    // 选中的图片
    // 能往左移动的最大距离
    var max = Math.abs(scrollId.offsetWidth - ul.scrollWidth) 
    for (var i = 0, len = liList.length; i < len; i++) {
        var li = liList[i]
        li.setAttribute('index', i)
        li.onclick = function () {
            for (var i = 0, len = liList.length; i < len; i++) {
                var tempLi = liList[i]
                tempLi.className = ''
            }
            this.className = 'activeImg'
            var index = parseInt(this.getAttribute('index'))

            // 跟轮播图进行同步，控制轮播图
            // swiper.ul.style.left = -index * swiper.imgWidth + 'px'
            // swiper.imgIndex = index

            // 先判断它是否要往右移动
            var exceedCount = Math.abs(ul.offsetLeft) / liWidth
            if (index < exceedCount) {
                // 说明已经移到可视区的左边，需向右移动
                moveAnimate(ul, -(Math.abs(ul.offsetLeft) - liWidth))
                return
            }

            // 向左移动,先判断还有位置移动不
            var surplus = max - Math.abs(ul.offsetLeft)
            if (surplus > 0) {
                var left = index * liWidth
                console.log(left, surplus)
                if (left > surplus) {
                    moveAnimate(ul, -surplus)
                } else {
                    moveAnimate(ul, -left)
                }
            }
            
        }
    }
    rArrow.addEventListener('click', function () {
        if (swiper.imgIndex === swiper.imgCount - 1) {
            ul.style.left = 0 + 'px'
            liList[0].click()
        } else {
            liList[swiper.imgIndex].click()
        }
    })
    lArrow.addEventListener('click', function () {
        liList[swiper.imgIndex].click()
    })
}


// 初始化轮播图
_initSwiper()

// 初始化滚动条
_initScroll()

