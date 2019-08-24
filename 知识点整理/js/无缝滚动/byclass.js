function byclass(classn){//全局获取
	var tags=document.all ? document.all : document.getElementsByTagName('*');
	var arr=[];
	for (var i = 0; i < tags.length; i++) {
		if (tags[i].className==classn) {
			arr.push(tags[i]);
		}
	};
	return arr;
}

function byclass2(parentID,classn){//局部获取
	var parent=document.getElementById(parentID);
	var tags=parent.all?parent.all:parent.getElementsByTagName('*');
	var arr=[];
	for (var i = 0; i < tags.length; i++) {
		if (tags[i].className==classn) {
			arr.push(tags[i]);
		}
	};
	return arr;
}