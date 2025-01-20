var snowElement = null;

window.onload = function() {
    // 确保雪花动画显示在首页
    snowElement = document.querySelector('body');  // 将目标元素更改为 <body>，使雪花覆盖整个页面
    if (snowElement) {
        init();
        snow();
    }
}

var snow_size = new Array();
var num = 30; // 雪花数量
var smallest = 15; // 雪花最小尺寸
var largest = 25; // 雪花最大尺寸
var dx = new Array(); // 雪花左右振动幅度大小
var xp = new Array(); // 水平位置
var yp = new Array(); // 垂直位置
var am = new Array();
var stx = new Array(); // 水平位移
var sty = new Array(); // 垂直位移
var doc_width;
var doc_height;

function makeSize() { // 定义每个雪花尺寸
    return smallest + Math.random() * largest;
}

function init() { // 初始化
    doc_width = snowElement.clientWidth;
    doc_height = document.documentElement.scrollHeight; // 使用视口高度

    for (var i = 0; i < num; ++i) {
        dx[i] = 0;
        xp[i] = Math.random() * (doc_width - 40);
        yp[i] = Math.random() * doc_height;
        am[i] = Math.random() * 20;
        snow_size[i] = makeSize();
        stx[i] = 0.01 + Math.random() / 100;
        sty[i] = 0.25 + Math.random();
        var newDiv = document.createElement("div")
        newDiv.id = 'snow_' + i;
        newDiv.style.position = 'absolute';
        newDiv.style.visibility = 'visible';
        newDiv.style.top = '15px';
        newDiv.style.left = '15px';
        newDiv.style.fontSize = snow_size[i] + 'px';
        newDiv.style.color = '#fff';
        newDiv.style.zIndex = '9999'; // 确保雪花在最上层
        newDiv.style.pointerEvents = 'none';
        newDiv.textContent = '🎄';
        snowElement.appendChild(newDiv);
    }
}

function snow() {
    for (var i = 0; i < num; ++i) {
        yp[i] += sty[i];
        if (yp[i] > doc_height - 50) { // 如果雪花到达底部
            xp[i] = Math.random() * (doc_width - am[i] - 20);
            yp[i] = 0; // 垂直位置重置为0
            stx[i] = 0.01 + Math.random() / 100;
            sty[i] = 0.25 + Math.random();
        }
        dx[i] += stx[i];
        document.getElementById("snow_" + i).style.top = yp[i] + 'px';
        document.getElementById("snow_" + i).style.left = xp[i] + am[i] * Math.sin(dx[i]) + 'px';
    }
    setTimeout("snow()", 10); // 每隔10毫秒调用一次snow函数
}
