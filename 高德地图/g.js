function rt(a) {
    var resCode = '';
    a.split("&").map(function (ele) {
        return ele.split('=');
    }).forEach(function (ele1) {
        if(ele1[0] == "code") {
            resCode = ele1[1]
        }
    });
    return resCode;
}

console.log(rt("code=96358F5761027FB5D830659E68598506&t=2"));


