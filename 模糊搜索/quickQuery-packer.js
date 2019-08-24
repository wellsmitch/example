(function () {
    //显示面板的一些属性名
    var l = {
        container: "quickQuery_container",//总容器
        resultNumBox: "quickQuery_resultNum_box",//总条数和分页数面板
        contentBox: "quickQuery_content_box",//数据展示面板
        pageBox: "quickQuery_page_box",//分页条面板
        ieContentFrame: "quickQuery_frame_forIE",
        ieContentBox: "quickQuery_content_box_forIE"
    };
    //数据列表的一些属性名
    var m = {
        exprElem: "quickQuery$focus",
        currentContent: "quickQuery_currentContent",
        currentPage: "quickQuery_currentPage",
        title: "quickQuery_title"
    };
    var n = document.all ? true : false;
    var o = {
        'isSubVal' : true, // 是否有附属值 默认为没有附属值
        'isPage'	: true,	// 是否启用分页功能 默认为启动分页
        'subSign'	: "-",	// 当有附属值的时候, 原值和附属值之间的间隔符号 默认符号为 -
        'buttonNum' : 5,	// 分页按钮数 默认按钮数为5个
        'viewContentNum' : 15	// 每页最大显示内容数 默认可视内容数为15 条
    };
    var p = {
        'subval': 0,
        'hz': 1,
        'py': 2
    };
    var bf = null;//自己定义的，用于存放点击某一条收据后的触发方法
    var isf = false;//自己定义的，是否处于翻页状态
    var q = null;//当前的input对象
    var r = 1;
    var s = o['buttonNum'];//分页按钮数
    var t = 1;//第几页
    var u = [];//匹配后的数据数组
    var v = [];
    String.prototype.trim = function () {
        //重定义String增加Trim函数
        return this.replace(/^\s*|\s*$/g, '');
    };
    var $ = function (a) {
        return document.getElementById(a);
    };

    //1.初始化
    //模式1 b为数据数组对象，c为可选参数
    //模式2 b为存放了input对象数组和对应的数据数组，c为可选参数
    //mb，点击面板上某一条数据后触发事件
    var w = window.$quickQuery = function (b, c, mb) {
        //防止没有传入可选参数，那c就是点击后的回调函数
        if (typeof c == "function") {
            bf = c;
        } else {
            bf = mb;
        }
        var d = [],
            e = [],
            f = null,
            g = null,
            h = true,//input是否失去焦点
            j = null;
        if (b) {
            if (c) {
                setConfig(c);//设置可选参数
            }

            if (b.length) {
                //模式1
                f = 0;
                d = getElemArray();//获取要初始化的input对象数组
                e = b;
            } else {
                //模式2
                f = 1;
                //遍历input对象数组，并存储好对应的数据数组
                for (var k in b) {
                    if ($(k)) {
                        d.push($(k));
                        e.push(b[k]);
                    }
                }
            }
            //遍历input对象
            d.each(function (i) {
                var a = this;
                a.onfocus = a.onclick = function () {
                    h = false;//input拥有焦点
                    if (!isf) {
                        //如果不是因为翻页触发的事件//把input清空
                        a.value = "";
                    } isf = false;
                    if (a != g) {
                        r = 1;
                        s = o['buttonNum'];
                        t = 1;
                    }
                    getQueryPanel(a);//获取对于的显示面板
                    callDifferentModel(f, a, e, i);//绑定面板的数据
                    a.focus();//input获得焦点
                    g = a;
                };

                //input输入事件
                a.onkeyup = function () {
                    var currKey = 0, ev = ev || event;
                    currKey = ev.keyCode || ev.which || ev.charCode;//支持IE、FF 
                    if ((currKey != 38 && currKey != 40 && currKey != 13)) {
                        r = 1,
                        s = o['buttonNum'],
                        t = 1;

                        callDifferentModel(f, a, e, i);
                    }
                };
                //监听键盘事件，主要是上下键，和enter键
                a.onkeydown = function keydown(e) {
                    var currKey = 0, ev = ev || event;
                    currKey = ev.keyCode || ev.which || ev.charCode;//支持IE、FF 
                    if (currKey) {
                        keydownEvent(currKey);
                    }
                };

                //失去焦点事件
                a.onblur = function () {
                    h = true
                };
                //这个页面点击事件，用于input失去焦点后关闭数据面板
                document.onclick = function () {
                    clearTimeout(j);
                    j = setTimeout(
                        function () {
                            if (h) {
                                closeQueryPanel();
                            }
                        }
                    , 10);
                }
            });
        }
    };
    var sid =0;
    function keydownEvent(key) {
        switch (key) {
            case 38://上键
            case 40://下键
                if (key == 40) {//下键加1
                    if (sid < o['viewContentNum']-1) {
                        sid = sid + 1;
                        $("queryLi" + (sid - 1)).style.backgroundColor = '';
                    }
                } else {//上键减一
                    if (key == 38) { 
                        if (sid >0) {
                            sid = sid - 1;
                            $("queryLi" + (sid + 1)).style.backgroundColor = '';
                        }
                    }
                }
                $("queryLi" + sid).style.backgroundColor = "blue";
                break;
            case 13://回车键
                $query_getClickValue($("queryLi" + sid).lang);
               
                break;
        }
    }
    
    //根据模式绑定数据 
    //a（0:模式一 1:模式而）
    //b（input对象）
    //c input对应的数据数组
    //i input对应的下标
    function callDifferentModel(a, b, c, i) {
        sid = 0;
        if (a == 0) {
            //模式一
            bindDataAndGetHtml(b, c);
        }
        else if (a == 1) {
            //模式二
            bindDataAndGetHtml(b, c[i]);
        }
    };

    //绑定数据  a:input对象，b:对应数据数组
    function bindDataAndGetHtml(a, b) {
        putDataIntoArray(a.value.trim(), b);//根据input值查找匹配数据
        bindDataIntoElements(function () {
            if (n) {
                $(l.ieContentFrame).style.width = $(l.ieContentBox).offsetWidth + "px";
                $(l.ieContentFrame).style.height = $(l.ieContentBox).offsetHeight + "px";
            }
        });
    };

    //设置可选参数配置
    function setConfig(a) {
        for (var b in a) {
            o[b] = a[b];
        }
    };

    //重新定义数组的遍历方法
    Array.prototype.each = function (a) {
        for (var i = 0; i < this.length; i++) {
            a.call(this[i], i);
        }
    };

    //创建input下对应的显示面板并返回
    function getQueryPanel(a) {
        q = a;
        if (!$(l.container)) {
            //面板不存在，创建
            var b = document.createElement("div");
            b.id = l.container; q.parentNode.appendChild(b);
            var c = '<div id=' + l.resultNumBox + '></div>';
            var d = '<div id=' + l.contentBox + '></div>';
            var e = '<div id=' + l.pageBox + '></div>';
            if (!n) {
                b.innerHTML = c + d + e;
            } else {
                var f = '<iframe id=' + l.ieContentFrame + ' frameborder="0"></iframe>';
                var g = '<div id=' + l.ieContentBox + '>' + c + d + e + '<div>';
                b.innerHTML = f + g;
            }
        } else {
            //面板存在，直接显示
            show($(l.container));
        }
        setPanelStyle();//设置面板样式
    };

    //设置面板的样式
    function setPanelStyle() {
        q.style.position = "absolute";
        $(l.container).style.position = "absolute";
        $(l.container).style.left = q.offsetLeft + "px";
        $(l.container).style.top = q.offsetTop + q.offsetHeight - (n ? 1 : 2) + "px";
        $(l.container).style.zIndex = 99; q.style.position = "";
        if (n) {
            $(l.container).style.border = "none";
        }
    };

    //根据input输入的值到数据列表中查找匹配的数据，并存储用于展示
    //a：input的值，b：input对应的数据数组
    function putDataIntoArray(a, b) {
      
        u = [];
        try {
            //循环数据数组
            for (var i = 0; i < b.length; i++) {
                var d = b[i][p['hz']].toLowerCase().indexOf(a.toLowerCase()) > -1;//第一列是否匹配
                var f = b[i][p['py']].toLowerCase().indexOf(a.toLowerCase()) > -1;//第一列是否匹配
                //有一列匹配就存储
                if (d || f) {
                    u.push(b[i]);
                }
            }
        }
        catch (e) {
        }
    };

    //设置匹配数据后总面板的样式
    function bindDataIntoElements(a) {
        var b = u.length,
            c = 0,
            d = b;
        var e = t * o['viewContentNum'],
            f = e - o['viewContentNum'] + 1;
        if (!o['isPage']) { e = b } if (o['isPage'] && e >= b) {
            e = u.length;
        }
        $(l.resultNumBox).innerHTML = "<b>Result: " + b + "</b>";
        if (e != 0 && e != 1) {
            $(l.resultNumBox).innerHTML += "  ( <i>" + f + " - " + e + "</i> )";
        }

        if (o['isPage']) {
            //匹配后的数据超过一页
            d = (b < o['viewContentNum']) ? b : o['viewContentNum'];
            if (t != 1) {
                c = (t - 1) * o['viewContentNum'];
                d = c + o['viewContentNum'];
            }
            getPageViewContentHtml(c, (c + o['viewContentNum']));
            getPageControlHtml(b);
        } else {
            //匹配后的数据只有一页
            getPageViewContentHtml(c, d);
        }
        if (!o['isPage'] || b < o['viewContentNum']) {
            hide($(l.pageBox));
        } else {
            show($(l.pageBox));
        }
        //如果a是方法，调用它
        if (typeof a == "function") {
            a.call(this);
        }
    };

    //创建匹配数据后的显示面板
    function getPageViewContentHtml(a, b) {
        if (u.length < a) {
            a = u.length - o['viewContentNum'];
            b = u.length;
        }
        if (a < 0) {
            a = 0;
            b = o['viewContentNum'];
        }
        var c = '<ul>';
        var rl = (r - 1) * o['viewContentNum'];
        for (var i = a,rl=0; i < b; i++,rl++) {
            if (u[i]) {
                var d = u[i][p['subval']],
                    e = u[i][p['hz']],
                    f = u[i][p['py']],
                    g = '<span class=' + m.title + '>' + e + '</span>' + f + '';
                var h = e;
                if (o['isSubVal']) {
                    h = e + o['subSign'] + d;
                }
                c += '<li id="queryLi' + rl + '" lang="' + h + ',' + f + '"><a href=javascript:$query_getClickValue("' + h + ',' + f + '");>' + g + '</a></li>';
            } else {
                // 确保出线多余的li标签
                // c += '<li> </li>';
            }
        } c += '</ul>';
        $(l.contentBox).innerHTML = c;
    };

    //根据匹配数据的长度创建翻页条
    //a：匹配后数据数组的长度
    function getPageControlHtml(a) {
        $(l.pageBox).innerHTML = "";
        if (a > o['viewContentNum']) {
            var b = a / o['viewContentNum'];
            if (/\./.test(b)) {
                b = Math.floor(b += 1);
            }
            if (b > o['buttonNum']) {
                if (r >= o['buttonNum']) {
                    $(l.pageBox).innerHTML += '<span><a href=javascript:$query_prevRound();><<</a></span>';
                }
                var c = r,
                    d = s;
                if (u.length < o['viewContentNum'] * t) {
                    d = b;
                } if (d > b) {
                    d = b;
                }
                getCurrentPageControl(c, d);
                if (d < b && (u.length > o['viewContentNum'] * t)) {
                    $(l.pageBox).innerHTML += '<span><a href=javascript:$query_nextRound();>>></a></span>';
                }
            } else {
                getCurrentPageControl(1, b);
            }
        }
        else {
            $(l.pageBox).innerHTML = "";
        }
    };

    //创建翻页条
    function getCurrentPageControl(a, b) {
        for (var i = a; i <= b; i++) {
            if (t == i) {
                $(l.pageBox).innerHTML += '<span><a class=' + m.currentPage + ' href=javascript:$query_topage("' + i + '");>' + i + '</a></span>';
            } else {
                $(l.pageBox).innerHTML += '<span><a href=javascript:$query_topage("' + i + '");>' + i + '</a></span>';
            }
        }
    };

    //点击数据面板上的某一条数据
    //checkValue:第一列的值和第二列的值组成的字符串
    var x = window.$query_getClickValue = function (checkValue) {
        var a = checkValue.split(',')[0];//获取第一列的值
        var b = checkValue.split(',')[1];//获取第二列的值
        //如果有设置点击后的触发方法，则调用它
        if (typeof bf == "function") {
            bf(a, b);
        }
        q.value = a;
        closeQueryPanel();
    };
    //点击到某一页
    var y = window.$query_topage = function (a) {
        isf = true;
        t = a;
        q.focus();
        bindDataAndGetHtml(q, u);
    };
    //下一个翻页条，比如原本是6-10页，点击变成1-5页
    var z = window.$query_prevRound = function () {
        isf = true;
        r = r - o['buttonNum']; s = s - o['buttonNum'];
        t = r; q.focus(); bindDataAndGetHtml(q, u);
    };
    //下一个翻页条，比如原本是1-5页，点击变成6-10页
    var A = window.$query_nextRound = function () {
        isf = true;
        r = r + o['buttonNum'];
        s = s + o['buttonNum'];
        t = r;
        q.focus();
        bindDataAndGetHtml(q, u);
    };
    //关闭（隐藏）数据面板
    function closeQueryPanel() {
        hide($(l.container));
    };
    function show(a) {
        if (a) a.style.display = "block";
    };
    function hide(a) {
        if (a) a.style.display = "none";
    };

    //获取要初始化的Input对象，放到列表集合并返回
    function getElemArray() {
        var a = [],
            b = document.getElementsByTagName("*") || document.all,
            c = /input/i,
            d = /text/i;
        for (var i = 0; i < b.length; i++) {
            if (c.test(b[i].tagName) && d.test(b[i].type)) {
                var e = b[i].className.split(' ');
                for (var j = 0; j < e.length; j++) {
                    if (e[j] == m.exprElem) {
                        a.push(b[i]);
                    }
                }
            }
        }
        return a;
    }
})();
