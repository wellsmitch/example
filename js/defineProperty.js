var data__ = [{a: 1}];
var MQ = function (data_) {
    this.data__ = data_;
    this.copyData__ = data_.concat();
    this.init();
};
MQ.prototype.init = function () {
    var that = this;
    this.data__.forEach(function (item, index) {
        that.addListener(index)
    });

    this.data__.push = function (info) {
        console.log(666);
        that.add(info);
    };
};

MQ.prototype.addListener = function (index) {
    var that = this;
    Object.defineProperty(that.data__, index, {
        get: function () {
            console.log("触发了get...");
            return that.copyData__[index];
        },
        set: function (newValue) {
            that.copyData__[index]= newValue;
            console.log("触发了set...");
        }
    });
};

MQ.prototype.add = function (info) {
    Array.prototype.push.call(this.data__, info);
    Array.prototype.push.call(this.copyData__, info);
    this.addListener(this.data__.length - 1);
};

var m = new MQ(data__);

data__.push({as: 111});
