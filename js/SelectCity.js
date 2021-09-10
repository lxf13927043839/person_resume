// 获取dom对象

var prov = document.getElementById('prov');
var city = document.getElementById('city');
var country = document.getElementById('country');
prov.onchange = function () {
    showCity()
}
city.onchange = function () {
    showCountry()
}
// 先初始化省份数据
showProv()



function showProv() {
    var len = provice.length;
    for (var i = 0; i < len; i++) {
        var provOpt = document.createElement('option');
        provOpt.innerText = provice[i]['name'];
        provOpt.value = i;
        prov.appendChild(provOpt);
    }
}

// 根据所选的省份来显示城市列表
function showCity() {
    // 每次都需要清空一下，否则会叠加
    city.innerHTML = ''
    var defaultOpt = document.createElement('option');
    defaultOpt.innerText = '请选择市';
    city.appendChild(defaultOpt);

    country.innerHTML = '';
    var defaultOptCountry = document.createElement('option');
    defaultOptCountry.innerText = '请选择县区';
    country.appendChild(defaultOptCountry);

    // 没有选择省份prov.selectedIndex 为 0 默认是"=请选择省份="
    if (prov.selectedIndex === 0) {
        return
    }
    // 加1的说明，它原本是有“=请选择省=”这一项的，我们的数据是加在它后边，所以对应的选择索引跟数组中的索引会差一个
    var provIndex = prov.selectedIndex - 1;
    var cityLen = provice[provIndex]['city'].length;

    for (var j = 0; j < cityLen; j++) {
        var cityOpt = document.createElement('option');
        cityOpt.innerText = provice[provIndex]['city'][j].name;
        cityOpt.value = j;
        city.appendChild(cityOpt);
    }
}

// 根据所选的城市来显示县区列表
function showCountry() {
    country.innerHTML = ''
    var defaultOpt = document.createElement('option');
    defaultOpt.innerText = '请选择县区';
    country.appendChild(defaultOpt);

    if (city.selectedIndex === 0) {
        return
    }
    var provIndex = prov.selectedIndex - 1;
    var cityIndex = city.selectedIndex - 1;
    var countryLen = provice[provIndex]['city'][cityIndex].districtAndCounty.length;
    for (var n = 0; n < countryLen; n++) {
        var countryOpt = document.createElement('option');
        countryOpt.innerText = provice[provIndex]['city'][cityIndex].districtAndCounty[n];
        countryOpt.value = n;
        country.appendChild(countryOpt);
    }
}
