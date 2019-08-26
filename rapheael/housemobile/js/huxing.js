/* global PAGEDATA, Paper */

define(function (require) {
    'use strict';


    /*
     ********************
     * 加载依赖模块
     ********************
     */

    require('/frontend/js/lib/utils');
    require('/modules/js/public/lib/paper');


    /*
     ********************
     * 初始化页面
     ********************
     */

    var parent = window.parent || window,
        PAGEDATA = parent.PAGEDATA,
        $wrapper = $('#drawWrapper'),
        selectedStyle = {
            fill: '#79ba1e',
            stroke: 'yellow'
        },
        zoom = 1,
        pageData = null,
        diagramPaper = null;



    init();
    // 初始化页面
    render(pageData);

    //初始化，获取对应的户型图数据
    function init(){
        PAGEDATA.diagram_position.forEach(function(v){
            if(v.id === id){
                pageData = v;
            }
            return false;
        });

        if(PAGEDATA.diagram_position.length > 1 && pageData){
            $('#diagramName').show().html(pageData.name);
        }
    }

    /*
     ********************
     * 加载页面
     ********************
     */

    function render(data) {

        // 加载画布
        renderPaper(data.url, function (paper) {
            var pos = data.position;

            // 设置画布以块显示
            paper.canvas.style.display = 'block';

            // 加载已有区域
            renderPolygons(paper, pos);

            // 加载右键菜单
            renderContextMenu(paper, PAGEDATA.roomtype_position);

            // 加载重叠时弹出提示信息
            renderPopMessage(paper);

            // 加载鼠标滑过时提示信息
            renderTipMessage();

            diagramPaper = paper;
        });
    }


    /*
     ********************
     * 加载画布
     ********************
     */

    function renderPaper(url, callback) {
        var img = new Image(),
            w = $wrapper.width(),
            h = $wrapper.height();

        img.onload = function () {
            var p = img.width / img.height;

            w / h < p ? (h = w / p) : (w = h * p);
            console.log(w);
            console.log(h);
            zoom = w / img.width;
            img.width = w;
            img.height = h;
            $('#drawPaper').width(w).height(h);
            $wrapper.width(w).height(450).append(img);
            callback(new Paper('drawPaper'));
        };

        img.onerror = function () {
            showMessage('加载户型图失败，请稍后再试');
        };

        img.style.float = 'left';
        img.src = url;
    }


    // 加载已有区域
    function renderPolygons(paper, items) {
        $.each(items, function (i, v) {
            var c = v.coordinate,
                mx, my,
                el, p = [];

            if (c.x && $.isNumeric(c.x)) {

                // 转换数据格式
                c.width = parseFloat(c.width);
                c.height = parseFloat(c.height);

                // 小于10px的区域不再绘制
                if (c.width < 10 || c.height < 10) {
                    return;
                }

                mx = parseFloat(c.x) + c.width;
                my = parseFloat(c.y) + c.height;
                c = [
                    [c.x, c.y],
                    [mx, c.y],
                    [mx, my],
                    [c.x, my]
                ];
            }

            if (!c || !c.length) {
                return;
            }

            $.each(c, function (i, v) {
                p.push([v[0] * zoom, v[1] * zoom]);
            });

            el = paper.polygon(p, true);
            el.uid = v.id;
            el.pid = v.position_id;
            el.node.setAttribute('data-tips', v.position_name);
            paper.style(selectedStyle, el);
        });

        paper.blur();
    }


    // 加载右键菜单
    function renderContextMenu(paper, items) {
        var $menu = $('#contextMenu'),
            code = createContextMenuCode(items),
            stopPropagation = true,
            actPolygon = null,
            maxY = 0;

        // 监听弹出右键菜单事件
        paper.on('showmenu', function (m) {
            actPolygon = paper.activePolygon;

            var pid = actPolygon.pid,
                top = maxY < m.y ? maxY : m.y;

            $menu.find('.ht-li').each(function (i, el) {
                var $el = $(el),
                    id = $el.data('id');

                id === pid ? $el.addClass('act') : $el.removeClass('act');
            });

            var w = $menu.width(),
                h = $menu.height(),
                maxW = parseFloat($('#drawPaper').width()),
                maxH = parseFloat($('#drawPaper').height()),
                left = m.x;

            //菜单不能超出边缘
            if(w + left >= maxW){
                left = maxW - w - 5;
            }

            //处理计算后为0的情况
            if(left < 0){
                left = 5;
            }

            if(h + top >= maxH){
                top = maxH - h - 5;
            }

            //处理计算后为0的情况
            if(top < 0){
                top = 5;
            }

            $menu.css({left: left, top: top}).show();
        });

        // 退出右键菜单
        paper.on('hidemenu', function () {
            actPolygon = null;
            $menu.hide();
        });


        // 设置菜单样式
        $wrapper.css('position', 'relative');
        $menu
            .css('position', 'absolute')
            .html(code)
            .on('contextmenu', function (e) {
                e.preventDefault();
            })
            .on('mousedown', function (e) {
                stopPropagation && e.stopPropagation();
                stopPropagation = true;
            })
            .on('mousedown', '.ht-remove', function () {
                actPolygon && paper.removePolygon(actPolygon);
                stopPropagation = false;
            })
            .on('mousedown', '.ht-li', function () {
                if (actPolygon) {
                    var $item = $(this);

                    actPolygon.pid = $item.data('id');
                    actPolygon.node.setAttribute('data-tips', $item.text());
                    paper.style(selectedStyle, actPolygon);
                }
                stopPropagation = false;
            });


        // 阻止列表滚动到底时触发外面滚动条滚动
        $menu.children('.ht-list').preventScroll();

        // #a1ecff: 青
        // #79ba1e: 绿

        maxY = $wrapper.height() - $menu.height();
        return $menu;
    }

    // 生成菜单内容
    function createContextMenuCode(items) {
        var code = '<h4 class="ht-tit">选择部位</h4>';

        code += '<ul  class="ht-list">';
        $.each(items, function (i, v) {
            code += '<li class="ht-li" data-id="' + v.id + '">' + v.position;
            code += '<i class="glyphicon glyphicon-ok pull-right"></i></li>';
        });
        code += '</ul><h4 class="ht-tit ht-remove"><i class="glyphicon glyphicon-trash"></i> 删除</h4>';

        return code;
    }


    // 加载重叠错误提示
    function renderPopMessage(paper) {
        var $pop = $('#popMessage'),
            timeStamp = null;

        paper.on('cross', function () {

            // 显示提示
            $pop.fadeIn(500);

            // 3秒后自动隐藏
            timeStamp && clearTimeout(timeStamp);
            timeStamp = setTimeout(function () {
                $pop.fadeOut(300);
            }, 3000);
        });
    }


    // 加载鼠标滑过时提示
    function renderTipMessage() {

        var $tipMessage = $('#tipMessage').hide();

        // 监听鼠标移入事件
        $wrapper.on('mousemove', '[data-tips]', function (e) {
            var title = this.getAttribute('data-tips'),
                rect, x, y;

            if (title) {

                // 获取位置信息
                rect = $wrapper.offset();
                x = e.clientX - rect.left;
                y = e.clientY - rect.top;

                $tipMessage
                    .text(title)
                    .css({left: x + 5, top: y})
                    .show();
            }
        });

        // 监听鼠标移出事件
        $wrapper.on('mouseleave', '[data-tips]', function () {
            $tipMessage.hide();
        });
    }


    // 获取区域数据
    function getPolygonData(paper) {
        var data = [],
            err = null;

        paper.each(function (points) {
            if (!this.pid) {
                err = '请在红框内鼠标右键选择部位';
                return false;
            }

            var p = [];

            $.each(points, function (i, v) {
                var x = Math.round(100 * v[0] / zoom) / 100,
                    y = Math.round(100 * v[1] / zoom) / 100;

                p.push([x, y]);
            });

            data.push({
                id: this.uid || '',
                pid: this.pid,
                coordinate: p
            });
        });

        return {
            err: err,
            data: data
        };
    }

    /*
     ********************
     * 工具方法
     ********************
     */

    // 提示信息
    function showMessage(message, isNormal) {
        parent.parent.$.topTips({
            mode: isNormal ? 'normal' : 'warning',
            tip_text: message
        });
    }

    //获取数据方法
    function getData(){
        var res = getPolygonData(diagramPaper),
            err = false;

        if(res.err){
            err = true;
        }

        return {pos: res.data, error : err};
    }

    window.getData = getData;
});
