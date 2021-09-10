// 页面滚动出去的距离
function getScroll() {
	// document.body.scrollTop); 在chrome中输出0
	// document.documentElement.scrollTop); 在chrome中输出带有小数
	var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	return {
		scrollLeft: scrollLeft,
		scrollTop: scrollTop
	}
}
// 获取坐标
function getPage(e) {
	var pageX = e.pageX || e.clientX + getScroll().scrollLeft;
	var pageY = e.pageY || e.clientY + getScroll().scrollTop;
	return {
		pageX: pageX,
		pageY: pageY
	}
}

/*
    移动的动画
    参数1：移动的dom元素
    参数2：移动到哪个位置，px，这个值是负值，因为它是向左移动的
    整体移动思路:
    1、防止重复点击，导致速度加快的定时器处理
    2、判断移动的位置跟当前位置的关系，往左移动，要加负值，往右是加正值
    3、在定时函数中，判断当前距离与目标位置距离的绝对值，是否小于step绝对值,小于说明已经到了
*/
// 元素正在处于动画中，如果有其他的地方有修改该元素的位置的，需要去判断这个动画是否完成了，不然会出问题
// 当该元素没有处于动画时，再进行其他的操作
function moveAnimate(element, distance) {
    element.moveAnimating = true
    var time = 20
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
          element.moveAnimating = false
          return 
        }
        element.style.left = element.offsetLeft + step + 'px'
        // console.log(element.offsetLeft)
    }, time)
}
