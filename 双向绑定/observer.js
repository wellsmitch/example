function Observe(data) {
    this.data = data;
    this.walk(data);
}

Observe.prototype = {
    walk: function (data) {
        var self = this;
        Object.keys(data).forEach(function (key) {
            self.defineReactive(data, key, data[key]);
        });
    },
    defineReactive: function (data, key, val) {
        observers(val);//递归所有子属性
        var dep = new Dep();

        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                if (Dep.target) {
                    dep.addSub(Dep.target);//在这里添加一个订阅者
                }
                console.log('属性' + key + '执行get');
                return val;
            },
            set: function (newVal) {
                if (val === newVal) {
                    return;
                }
                val = newVal;
                dep.notify();//如果数据变化，通知所有订阅者
                console.log('属性：' + key + '以及被监听，现在值为：' + newVal.toString());
            }
        })
    }
};

function observers(data) {
    if (!data || typeof data != 'object') {
        return;
    }
    return new Observe(data);
}


/**Dep:创建一个可以容纳订阅者的消息订阅器
 * **/

function Dep() {
    this.subs = [];
    this.target = null;
}

Dep.prototype = {
    addSub: function (sub) {//添加订阅者
        this.subs.push(sub);
    },
    notify: function () {//通知订阅者
        this.subs.forEach(function (sub) {
            sub.update();
        })
    }
};

function Watcher(vm,exp,cb){
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.value = this.get();//将自己添加到订阅器的操作
}
Watcher.prototype = {
    update:function () {
        this.run();
    },
    run:function () {
        var value = this.vm.data[this.exp];
        var oldVal = this.value;
        if(value != oldVal){
            this.value = value;
            this.cb.call(this.vm,value,oldVal);
        }
    },
    get:function () {
        Dep.target = this;//缓存自己
        var value = this.vm.data[this.exp];//强制执行监听器observer里的Object.defineProperty()里的get函数
        Dep.target = null;//释放自己
        return value;
    }
};

function SelfVue(data,el,exp){
    var self = this;
    this.data = data;

    Object.keys(data).forEach(function (key) {
        self.proxyKeys(key);//绑定代理属性
    });

    // observers(data);
    // el.innerHTML = this.data[exp];//初始化模板数据的值
    // new Watcher(this,exp,function(value){
    //     el.innerHTML = value;
    // });
    return this;
}

SelfVue.prototype = {
    proxyKeys:function(key){
        var self = this;
        Object.defineProperty(this,key,{
            enumerable:false,
            configurable:true,
            get:function proxyGetter(){
                return self.data[key];
            },
            set:function proxySetter(newVal){
                self.data[key] = newVal;
            }
        })
    }
};



