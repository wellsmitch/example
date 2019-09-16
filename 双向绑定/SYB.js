
function SYB(obj) {
    // 对象监听的双向绑定
    this.obj = obj;
}

SYB.prototype.dataWatcher = function () {
var that = this;
    function definePropertyfun(target_data, name_1) {
        console.log(target_data,'14324234');
        Object.defineProperty(target_data, '', {
            enumerable: false,
            configurable: true,
            get: function () {
                return target_data[name_1];
            },
            set: function (newVal) {
                console.log("set initttttttt");
                target_data[name_1] = newVal;
                document.getElementById('boxCon').innerText = newVal;
                again(target_data)
            }
        })
    }
    var dataWatcherObj = {};
    dataWatcherObj["S_initKey"] = dataWatcherObj;
    // 递归遍历对象
    // Object.defineProperty(that.obj,"watchData",{
    //     get:function(){
    //         console.log('get init');
    //     },
    //     set:function(val){
    //         console.log("set init");
    //         that.obj.watchData = val
    //         // ("uName").innerText=val;
    //         // ("uName").innerText=val;
    //         // document.getElementById("userName").value=val;
    //     }
    // });
    // function diguiObject(dataWatcherObj) {
    //     console.log(dataWatcherObj);
    //     for( let key in dataWatcherObj ) {
    //         if (String(dataWatcherObj[key]) === "[object Object]") {
    //             diguiObject(dataWatcherObj[key]);
    //             console.log(44534534);
    //         }
    //         // Object.defineProperty(dataWatcherObj,key,{
    //         //     get:function(){
    //         //         console.log('get init');
    //         //         return dataWatcherObj[key];
    //         //     },
    //         //     set:function(newVal){
    //         //         console.log("set init");
    //         //         dataWatcherObj[key] = newVal;
    //         //     }
    //         // });
    //
    //         // Object.defineProperty(dataWatcherObj, key, {
    //         //     enumerable: false,
    //         //     configurable: true,
    //         //     get: function () {
    //         //         return dataWatcherObj[key];
    //         //     },
    //         //     set: function (newVal) {
    //         //         console.log("set initttttttt");
    //         //         dataWatcherObj[key] = newVal;
    //         //        // document.getElementById('boxCon').innerText = newVal;
    //         //        // again(target_data)
    //         //     }
    //         // })
    //     }
    //
    // }
    // diguiObject(this.obj);
    // definePropertyfun(dataWatcherObj, "S_initKey");
  /*  if (Array.isArray(this.obj)) { // 监听数组数据
        this.obj.forEach(function (ele, i) {
            dataWatcherObj[i.toString()] = ele;
        });
        for (var key in dataWatcherObj) {
            definePropertyfun(dataWatcherObj, key);
        }
    } else if (typeof this.obj && !Array.isArray(this.obj)) { // 监听对象数据
        for (var key in this.obj) {
            definePropertyfun(this.obj, key);
        }
    }else { // 监听其他数据  string  Boolean
        dataWatcherObj["start" + new Date().getTime()] = this.obj;
        definePropertyfun(dataWatcherObj, key);
    }*/
    // return dataWatcherObj;
};
// cookie start
//添加和修改
SYB.prototype.setCookie = function (name, value, n) {
    var now = new Date();
    now.setDate(now.getDate() + n);
    //把中文编码
    value = encodeURIComponent(value);
    document.cookie = name + '=' + value + ';expires=' + now+';path=/';
};

//修改
SYB.prototype.removeCookie = function (name) {
    setCookie(name, '', -7);
};

//通过cookie名称，获取对应的值
//如果获取不到cookie ，就会返回undefined

SYB.prototype.getCookie = function (name) {
    var cookie = document.cookie;
    var arr = cookie.split('; ');
    for(var i = 0; i < arr.length; i++) {
        var item = arr[i];
        var tmpArr = item.split('=');
        if(tmpArr[0] == name) {
            return  decodeURIComponent(tmpArr[1])
        }
    }
};
// 获取search
//获取url中查询字段

SYB.prototype.getUrlParam = function (param){
    var search = location.search;
    search = search.slice(1);
    var arr = search.split('&');
    var r = null;
    arr.forEach(function(value){
        var tmpArr = value.split('=');
        if(tmpArr[0] == param){
            r =  tmpArr[1];
        }
    });
    return r;
};

