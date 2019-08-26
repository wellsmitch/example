/* global PAGEDATA, Paper */

define(function (require) {
    'use strict';


    /*
     ********************
     * 加载依赖模块
     ********************
     */

    require('../utils');
    require('../../../../modules/js/public/lib/paper');


    /*
     ********************
     * 初始化页面
     ********************
     */

    var PAGEDATAstring =
        '{' +
        '"roomtype_id":"39e82058-a0e0-0e71-bc71-c8596a6f2956",' +
        '"roomtype_position":[{"id":"bef72d4a-362e-cb7b-1642-165bd1b621f6","position":"客厅"},' +
                                '{"id":"d26791e8-15c4-f1a4-d05e-95ba91648f1a","position":"主卧室"},' +
                                '{"id":"b7810724-4218-d146-1cc8-4acbaa048cb2","position":"次卧室"},' +
                                '{"id":"bd6d8e1b-6e69-9701-33ce-7de23138227e","position":"厨房"},' +
                                '{"id":"1c13c849-e9dd-386c-b96d-a87975394249","position":"主卫"},' +
                                '{"id":"7a45d664-fb29-07f4-d28e-2cb2427bf6f3","position":"卫生间"},' +
                                '{"id":"f84a8c9a-61ef-c230-ca7a-b0a4fd739b1e","position":"玄关"},' +
                                '{"id":"4784763a-935f-1cf3-8a79-6181fcba736c","position":"餐厅"},{"id":"3c684b07-047e-a826-7f48-577ce29b74ed","position":"阳台"},{"id":"3b13bbf3-784b-9a0a-8672-a98c1d75cc35","position":"衣帽间"},{"id":"84b6d3b8-13ab-b440-c192-3f6787edec75","position":"书房"},{"id":"93767ce5-fc24-12cf-b248-5afff682cd59","position":"露台"},{"id":"39d85b38-d10b-cd75-50f2-bfac511c87c9","position":"电梯"},{"id":"39e8205b-400c-e8aa-80aa-3ce573f9fb07","position":"车库"},{"id":"39e8205d-9980-459c-0065-38f7701425ca","position":"洗衣房"}],' +
        '"diagram_position":[{"id":"39e82058-a131-8101-0671-7c804c7fc1f2","url":"https://img.myysq.com.cn/mobilecheckroom/projectroomtype/yasin/39e82058-1a29-05c4-b2bd-35f6e762c7c8_orig.png","name":"图片13",' +
        '"position":[{"id":"39e82470-dd14-f75a-87b7-7c3034f51f61","coordinate":[["630.05","177.31"],["699.8","177.31"],["703.34","213.96"],["761.27","215.14"],["760.08","235.24"],["686.79","235.24"],["684.43","219.87"],["632.42","218.69"]],"position_id":"93767ce5-fc24-12cf-b248-5afff682cd59","position_name":"露台"},{"id":"39e82470-dd15-010a-2e55-48404938ceb9","coordinate":[["435.01","99.3"],["484.66","99.3"],["484.66","128.85"],["446.83","127.67"],["444.47","114.66"],["430.28","114.66"]],"position_id":"93767ce5-fc24-12cf-b248-5afff682cd59","position_name":"露台"},{"id":"39e82470-dd15-1965-3ae4-cb80993fdae3","coordinate":[["368.81","130.03"],["320.35","130.03"],["320.35","85.11"],["368.81","85.11"]],"position_id":"b7810724-4218-d146-1cc8-4acbaa048cb2","position_name":"次卧室"},{"id":"39e82470-dd15-3b16-2d94-c47081fb1973","coordinate":[["761.27","209.23"],["706.89","208.05"],["706.89","174.95"],["684.43","171.4"],["685.61","152.49"],["761.27","151.31"]],"position_id":"d26791e8-15c4-f1a4-d05e-95ba91648f1a","position_name":"主卧室"},{"id":"39e82470-dd15-4cfb-851e-2c47eb893e62","coordinate":[["712.8","48.47"],["761.27","48.47"],["761.27","102.84"],["712.8","102.84"]],"position_id":"84b6d3b8-13ab-b440-c192-3f6787edec75","position_name":"书房"},{"id":"39e82470-dd15-5b34-8a3f-2c0e93843fe3","coordinate":[["515.39","65.01"],["562.67","65.01"],["562.67","118.21"],["515.39","118.21"]],"position_id":"b7810724-4218-d146-1cc8-4acbaa048cb2","position_name":"次卧室"},{"id":"39e82470-dd15-5fa2-c210-214dadd55c01","coordinate":[["515.39","46.1"],["567.4","46.1"],["567.4","62.65"],["515.39","62.65"]],"position_id":"93767ce5-fc24-12cf-b248-5afff682cd59","position_name":"露台"},{"id":"39e82470-dd15-8b7a-ca05-969f6e2a34f8","coordinate":[["469.29","131.21"],["483.47","132.39"],["484.66","232.87"],["432.64","232.87"],["431.46","159.58"],["470.47","159.58"]],"position_id":"b7810724-4218-d146-1cc8-4acbaa048cb2","position_name":"次卧室"},{"id":"39e82470-dd15-a47e-48cc-75d32dcffcd6","coordinate":[["631.24","104.02"],["684.43","104.02"],["684.43","141.85"],["631.24","141.85"]],"position_id":"1c13c849-e9dd-386c-b96d-a87975394249","position_name":"主卫"},{"id":"39e82470-dd15-ccb0-9273-917fc62ee559","coordinate":[["628.87","144.21"],["683.25","144.21"],["683.25","174.95"],["628.87","174.95"]],"position_id":"3b13bbf3-784b-9a0a-8672-a98c1d75cc35","position_name":"衣帽间"},{"id":"39e82470-dd15-d4bc-350d-748ac22fdf82","coordinate":[["432.64","131.21"],["466.93","131.21"],["466.93","156.04"],["432.64","156.04"]],"position_id":"7a45d664-fb29-07f4-d28e-2cb2427bf6f3","position_name":"卫生间"},{"id":"39e82470-dd15-dbf7-1f06-d8f8c1bc34fc","coordinate":[["488.2","70.93"],["513.03","70.93"],["513.03","115.84"],["488.2","115.84"]],"position_id":"7a45d664-fb29-07f4-d28e-2cb2427bf6f3","position_name":"卫生间"},{"id":"39e82470-dd15-e87e-d48b-874dfb5e2d61","coordinate":[["685.61","54.38"],["708.07","54.38"],["708.07","102.84"],["685.61","102.84"]],"position_id":"93767ce5-fc24-12cf-b248-5afff682cd59","position_name":"露台"},{"id":"39e82470-dd15-ea6f-bf5d-ea72e5cc7010","coordinate":[["436.19","236.42"],["483.47","237.6"],["483.47","251.79"],["511.84","251.79"],["511.84","270.7"],["435.01","269.52"]],"position_id":"93767ce5-fc24-12cf-b248-5afff682cd59","position_name":"露台"},{"id":"39e82470-dd16-088d-31eb-ce7f85cedf52","coordinate":[["238.78","148.94"],["290.79","148.94"],["290.79","184.41"],["238.78","184.41"]],"position_id":"bd6d8e1b-6e69-9701-33ce-7de23138227e","position_name":"厨房"},{"id":"39e82470-dd16-4d52-70ca-4ee15214a90f","coordinate":[["131.21","177.31"],["178.5","177.31"],["178.5","264.79"],["131.21","264.79"]],"position_id":"39e8205b-400c-e8aa-80aa-3ce573f9fb07","position_name":"车库"},{"id":"39e82470-dd16-5622-807a-513581b8f18a","coordinate":[["83.93","88.66"],["126.48","88.66"],["126.48","109.93"],["83.93","109.93"]],"position_id":"39e8205d-9980-459c-0065-38f7701425ca","position_name":"洗衣房"},{"id":"39e82470-dd16-721e-036b-e6f36ce713fc","coordinate":[["238.78","186.77"],["290.79","186.77"],["290.79","264.79"],["238.78","264.79"]],"position_id":"4784763a-935f-1cf3-8a79-6181fcba736c","position_name":"餐厅"},{"id":"39e82470-dd16-855e-2add-01c4af774055","coordinate":[["366.45","263.61"],["293.16","263.61"],["293.16","185.59"],["366.45","185.59"]],"position_id":"bef72d4a-362e-cb7b-1642-165bd1b621f6","position_name":"客厅"},{"id":"39e82470-dd16-92bd-30e8-f36703613d14","coordinate":[["288.43","143.03"],["273.06","143.03"],["273.06","117.03"],["288.43","117.03"]],"position_id":"3b13bbf3-784b-9a0a-8672-a98c1d75cc35","position_name":"衣帽间"},{"id":"39e82470-dd16-caf8-7fcf-c15e3e32a4cf","coordinate":[["315.62","138.3"],["296.7","138.3"],["296.7","122.94"],["315.62","122.94"]],"position_id":"f84a8c9a-61ef-c230-ca7a-b0a4fd739b1e","position_name":"玄关"},{"id":"39e82470-dd16-d1f8-a1a7-438adecc93d7","coordinate":[["239.96","119.39"],["269.52","119.39"],["269.52","146.58"],["239.96","146.58"]],"position_id":"7a45d664-fb29-07f4-d28e-2cb2427bf6f3","position_name":"卫生间"}]}],"room_type":"56.57.58.62%E8%A5%BF%E6%88%B7","proj_name":"%E4%BA%8C%E6%9C%9FB%E5%8C%BA%E4%BA%8C%E6%89%B9%E6%AC%A1"}'
    // PAGEDATAstring = '{"roomtype_id":"39e82058-a0e0-0e71-bc71-c8596a6f2956","roomtype_position":[{"id":"bef72d4a-362e-cb7b-1642-165bd1b621f6","position":"客厅"}]}';
    console.log(JSON.parse(PAGEDATAstring));
    var parent = window.parent || window,
        PAGEDATA = JSON.parse(PAGEDATAstring),
        // PAGEDATA = parent.PAGEDATA,
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
        console.log(data);
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
            console.log(m);
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
        // debugger
        var res = getPolygonData(diagramPaper),
            err = false;

        if(res.err){
            err = true;
        }
        console.log(res.data);
        return {pos: res.data, error : err};
    }

    window.getData = getData;
});
