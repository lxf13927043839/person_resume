// 个人博客鼠标进入事件
var personalBlog = document.getElementById('personalBlog')
personalBlog.onmouseover = function () {
    var nav = document.getElementById('nav-1')
    nav.style.height = '200px'
    nav.style.opacity = '1'
    nav.style.visibility = 'visible'
}
personalBlog.onmouseout = function () {
    var nav = document.getElementById('nav-1')
    nav.style.height = '0px'
    nav.style.opacity = '0'
    nav.style.visibility = 'hidden'
}
// 联系方式的处理
var contact = document.getElementById('contact')
contact.onmouseover = function () {
    var content = document.getElementById('contact-content')
    content.style.display = 'block'
}
contact.onmouseout = function () {
    var content = document.getElementById('contact-content')
    content.style.display = 'none'
}

// 小问号处理
var question1 = document.getElementById('question1')
question1.onmouseover = function () {
    question1.nextElementSibling.style.display = 'inline-block'
}
question1.onmouseout = function () {
    question1.nextElementSibling.style.display = 'none'
}
var question2 = document.getElementById('question2')
question2.onmouseover = function () {
    question2.nextElementSibling.style.display = 'inline-block'
}
question2.onmouseout = function () {
    question2.nextElementSibling.style.display = 'none'
}

// 购买数量的加减
var minus  = document.querySelector('.icon-minus')
var plus  = document.querySelector('.icon-plus')
var showCount = document.getElementById('showCount')
var saleOne = document.getElementById('sale-only-one')
var buyBtn = document.querySelector('.buy-button')
minus.onclick = function () {
    var count = parseInt(showCount.innerText)
    if (count === 1) {
        return 
    }
    count--
    showCount.innerText = count
    if (count === 1) {
        buyBtn.classList.remove('disable-btn')
        saleOne.classList.remove('disable-color')
    }
}
plus.onclick = function () {
    var count = parseInt(showCount.innerText)
    if (count == 99) {
        return 
    }
    count++
    showCount.innerText = count
    if (count > 1) {
        buyBtn.classList.add('disable-btn')
        saleOne.classList.add('disable-color')
    }
}
// 给技能树添加一下动画抖动效果
var skillList = document.getElementById('skillList')
for (var i = 0, len = skillList.children.length; i < len; i++) {
    var li = skillList.children[i]
    li.onmouseover = animateShake
}
function animateShake () {
    this.classList.add('shill-shake')
    setTimeout(() => {
        this.classList.remove('shill-shake')
    }, 500)
}