// 轮播图
var swiper = {
    ul: null,
    imgIndex: 0,
    imgCount: 0,
    imgWidth: 0,
    switchTime: 2000,
    cloneFirstLi: null,
    mouseoverFlag: false
}
var lArrow = document.getElementById('l-arrow')
var rArrow = document.getElementById('r-arrow')

// 初始化克隆第一张图片, ul的宽度, 定位, 用img宽度, img数量
function _initSwiper() {
    var position = 'absolute'
    swiper.ul = document.getElementById('swiper-wrapper').children[0]
    // 初始化动画控制条件，不然第一次无法点击
    swiper.ul.moveAnimating = false
    // 克隆第一张图片
    swiper.cloneFirstLi = swiper.ul.children[0].cloneNode(true)
    swiper.ul.appendChild(swiper.cloneFirstLi)

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
    setInterval(function () {
        if (!swiper.mouseoverFlag) {
            rArrow.click()
        }
    }, 2000)
    // 鼠标悬停的时候,不要轮播
    swiper.ul.onmouseover = function () {
        swiper.mouseoverFlag = true
    }
    swiper.ul.onmouseout = function () {
        swiper.mouseoverFlag = false
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
            // 如果轮播图处于动画中，那么就不能去操作，打断，会出问题
            if (swiper.ul.moveAnimating === false) {
                for (var i = 0, len = liList.length; i < len; i++) {
                    var tempLi = liList[i]
                    tempLi.className = ''
                }
                this.className = 'activeImg'
                var index = parseInt(this.getAttribute('index'))
                // 跟轮播图进行同步，控制轮播图,它设置的时候，是不会有动画的，动画是需要调用的，没用transition
                // 如果用transition，那也可以先将transition设置null，再进行处理
                swiper.ul.style.left = -index * swiper.imgWidth + 'px'
                swiper.imgIndex = index

                // 小图向左移动,先判断还有位置移动不
                var surplus = max - Math.abs(ul.offsetLeft)
                if (surplus > 0) {
                    var left = index * liWidth
                    if (left > surplus) {
                        moveAnimate(ul, -surplus)
                    } else {
                        moveAnimate(ul, -left)
                    }
                }
            }
        }
    }
    rArrow.addEventListener('click', function () {
        // 设置激活的样式
        for (var i = 0, len = liList.length; i < len; i++) {
            var tempLi = liList[i]
            tempLi.className = ''
        }
        if (swiper.imgIndex === swiper.imgCount - 1) {
            ul.style.left = 0 + 'px'
            // 此时已经是第一张，不用移动
            liList[0].className = 'activeImg'      
        } else {
            liList[swiper.imgIndex].className = 'activeImg'
            // 激活的样式图片往左靠
            // 判断是否还有位置移动
            var surplus = max - Math.abs(ul.offsetLeft)
            if (surplus > 0) {
                moveAnimate(ul, -liWidth) 
            }
        }
    })
    lArrow.addEventListener('click', function () {
        // 设置激活的样式
        for (var i = 0, len = liList.length; i < len; i++) {
            var tempLi = liList[i]
            tempLi.className = ''
        }
        // 现在是第一张图，此时如果点击左移，那么imgIndex是克隆图的前一个索引,可以看上边索引的处理
        // 注意一下就是，imgCount它是包含了克隆的那一张的，而且索引是从0开始的
        if (swiper.imgIndex === swiper.imgCount - 2) {
            ul.style.left = -max + 'px'
            // 此时已经是第一张，不用移动
        } else {
            // 先判断它是否要往右移动
            var exceedCount = Math.abs(ul.offsetLeft) / liWidth
            if (swiper.imgIndex < exceedCount) {
                // 说明已经移到可视区的左边，需向右移动
                moveAnimate(ul, -(Math.abs(ul.offsetLeft) - liWidth))
            }
        }
        liList[swiper.imgIndex].className = 'activeImg'

    })
}


// 初始化轮播图
_initSwiper()

// 初始化滚动条
_initScroll()

