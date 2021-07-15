'use strict';

var localStream;
var allUserInfo = {};
var currUserInfo = {};
var sendMessageBtn = document.querySelector('#sendMessageBtn');
var msgTxt = document.querySelector('#msgTxt');
var title = document.title;
var connectConfig = {
    "iceServers": [{
        "url": "stun:47.111.113.130"
    }, {
        "url": "turn:47.111.113.130", username: "mrwang", credential: "wangxiaofeng"
    }]
};
var headPhoto = ['images/heisenberg.png', 'images/heisenberg.png', 'images/haha.gif', 'images/mj.gif', 'images/yaseng.png'];

//connectConfig = {"iceServers": [{"url" : "stun:47.111.113.130"}]};

var room = 'online';
var url = (location.protocol == 'https:' ? 'wss://' : 'ws://') + location.host + '/websocket/' + room;
url = 'wss://www.wellsmitch.top:4443/websocket/online';
var socket = new WebSocket(url);

socket.on = function (name, callback) {
    if (!this.event) {
        this.event = {};
    }
    this.event[name] = callback;
};

socket.onmessage = function (message) {
    var data = JSON.parse(message.data);
    this.event[data.event](data.message, data.userInfo);
};

socket.emit = function (name, message, sendTo) {
    this.send(JSON.stringify({'event': name, 'message': message, 'userInfo': currUserInfo, 'sendTo': sendTo}));
};

socket.on('open', function (message) {
    var count = message.onlineCount;
    var userInfo = currUserInfo = message.userInfo;
    userInfo.portrait = headPhoto[Math.round(Math.random() * (headPhoto.length - 1))];
    receiveMessage(currUserInfo, '欢迎加入激情聊天室！');
    console.log("online number:", count);
    console.log('curr user info :', userInfo);
    document.title = title + ' (' + count + ')';
    initAudio();
});

socket.on('join', function (message, userInfo) {
    receiveMessage(userInfo, '进入房间');
    addUser(userInfo);
    doCall(userInfo);
    document.title = title + ' (' + (Object.keys(allUserInfo).length + 1) + ')';
});

socket.on('leave', function (message) {
    var userInfo = getUser(message.userInfo.userId);
    if (!userInfo) return;
    receiveMessage(userInfo, '离开房间');
    delUser(userInfo.userId);
    userInfo.connect.getRemoteStreams().forEach(function (stream) {
        document.getElementById(stream.id).parentElement.remove();
    });
    userInfo.dataChannel && userInfo.dataChannel.close();
    userInfo.connect && userInfo.connect.close();

});

// This client receives a message
socket.on('message', function (message, userInfo) {
    console.log('Client received message:', message, userInfo);
    var userId = userInfo.userId;
    if (message.type === 'offer') {
        console.log("received offer");
        addUser(userInfo);
        getConnect(userId).setRemoteDescription(new RTCSessionDescription(message));
        doAnswer(userInfo);
    } else if (message.type === 'answer') {
        console.log("received answer");
        getConnect(userId).setRemoteDescription(new RTCSessionDescription(message));
    } else if (message.type === 'candidate') {
        var candidate = new RTCIceCandidate({
            sdpMLineIndex: message.label,
            candidate: message.candidate
        });
        getUser(userId).connect.addIceCandidate(candidate);
    }
});


function sendServerMessage(message, name, sendTo) {
    console.log('Client sending message: ', message);
    socket.emit(name || 'message', message, sendTo);
}

function gotStream(stream) {
    localStream = stream;
    handleRemoteStreamAdded({stream: stream});
    sendServerMessage(currUserInfo, 'join');
}

function initAudio() {
    var constrains = {
        video: true,
        audio: true
    };
    var success = gotStream;
    var error = errorStream;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        //最新标准API
        navigator.mediaDevices.getUserMedia(constrains).then(success).catch(error);
    } else if (navigator.webkitGetUserMedia) {
        //webkit内核浏览器
        navigator.webkitGetUserMedia(constrains).then(success).catch(error);
    } else if (navigator.mozGetUserMedia) {
        //Firefox浏览器
        navagator.mozGetUserMedia(constrains).then(success).catch(error);
    } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constrains).then(success).catch(error);
    } else {
        error({name: 'Cannot open media device'});
    }

}

function errorStream(e) {
    receiveMessage(currUserInfo, e.name);
    sendServerMessage(currUserInfo, 'join');
}

// window.addEventListener('load', initAudio);

function createPeerConnection(userId) {
    try {
        var connect = new RTCPeerConnection(connectConfig);
        console.log(connect);
        connect.onicecandidate = function (event) {
            handleIceCandidate(event, userId);
        };
        connect.onaddstream = function (event) {
            handleRemoteStreamAdded(event, userId);
        };
        connect.onremovestream = handleRemoteStreamRemoved;
        if (localStream) {
            connect.addStream(localStream);
        }
        connect.ondatachannel = handleRemoteDataChannel;
        console.log('Created RTCPeerConnnection');
        allUserInfo[userId].dataChannel = connect.createDataChannel('sendDataChannel', null);
        return connect;
    } catch (e) {
        console.log('Failed to create PeerConnection, exception: ' + e.message);
        alert('Cannot create RTCPeerConnection object. Please download Google Chrome');
        return;
    }
}

function handleIceCandidate(event, userId) {
    console.log('icecandidate event: ', event);
    if (event.candidate) {
        sendServerMessage({
            type: 'candidate',
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate
        }, '', userId);
    } else {
        console.log('End of candidates.');
    }
}

function handleCreateOfferError(event) {
    console.log('createOffer() error: ', event);
}

function doCall(userInfo) {
    var connect = userInfo.connect;
    console.log('Sending offer to peer');
    connect.createOffer().then(function (sessionDescription) {
        connect.setLocalDescription(sessionDescription);
        console.log('setLocalAndSendMessage sending message', sessionDescription);
        sendServerMessage(sessionDescription, '', userInfo.userId);
    }, handleCreateOfferError);
}

function doAnswer(userInfo) {
    var connect = userInfo.connect;
    console.log('Sending answer to peer.');
    connect.createAnswer().then(function (sessionDescription) {
        connect.setLocalDescription(sessionDescription);
        console.log('setLocalAndSendMessage sending message', sessionDescription);
        sendServerMessage(sessionDescription, '', userInfo.userId);
    }, onCreateSessionDescriptionError);
}

function onCreateSessionDescriptionError(error) {
    trace('Failed to create session description: ' + error.toString());
}

function handleRemoteStreamAdded(event, userId) {
    var userInfo = getUser(userId) || currUserInfo;
    console.log('Remote stream added.', event);
    var container = document.createElement('div');
    var nameEle = document.createElement('div');
    var video = document.createElement('video');
    video.srcObject = event.stream;
    video.autoplay = true;
    video.id = event.stream.id;
    video.playsinline = true;
    if (userInfo == currUserInfo) {
        video.muted = true;
    }


    nameEle.className = 'username';
    nameEle.innerText = userInfo.userName;
    container.className = 'video-container';
    container.appendChild(video);
    container.appendChild(nameEle);
    document.getElementById('videos').appendChild(container);
}

function handleRemoteStreamRemoved(event) {
    console.log('Remote stream removed. Event: ', event);
}

function handleRemoteDataChannel(event) {
    var receiveChannel = event.channel;
    var userInfo;
    for (var userId in allUserInfo) {
        userInfo = getUser(userId);
        if (userInfo == receiveChannel) {
            break;
        }
    }
    receiveChannel.onmessage = function (ev) {
        receiveMessage(userInfo, ev.data);
    }
}

function addUser(userInfo) {
    var userId = userInfo.userId;
    allUserInfo[userId] = userInfo;
    allUserInfo[userId].connect = createPeerConnection(userId);
}

function getUser(userId) {
    return allUserInfo[userId];
}

function getAllUser() {
    return allUserInfo;
}

function delUser(userId) {
    delete allUserInfo[userId];
    document.title = title + ' (' + (Object.keys(allUserInfo).length + 1) + ')';
}

function getConnect(userId) {
    return allUserInfo[userId].connect;
}

$(msgTxt).bind('keyup', function (event) {
    if (event.keyCode == "13") {
        sendMessageBtn.click();
    }
});

sendMessageBtn.onclick = function () {
    for (var userId in allUserInfo) {
        var dataChannel = allUserInfo[userId].dataChannel;
        if (dataChannel && dataChannel.readyState === 'open' && msgTxt.value) {
            dataChannel.send(msgTxt.value);
        }
    }
    receiveMessage(currUserInfo, msgTxt.value);
    msgTxt.value = '';
    msgTxt.focus();
};


function receiveMessage(userInfo, text) {
    var item = {
        img: userInfo.portrait,
        info: userInfo.userName + ' : ' + text,
        href: '#',
        close: true,
        speed: 6,
        color: '#ffffff',
        old_ie_color: '#ffffff',
    };
    $('body').barrager(item);
}