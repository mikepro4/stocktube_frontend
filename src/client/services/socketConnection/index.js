import openSocket from 'socket.io-client';
import { toast } from 'react-toastify';
import { io } from "../../socket"

let socket

// const Peer = require("./peer").default

// const { websocket, peerjsEndpoint } = env_config;

let socketInstance;
let peers = {};

class SocketConnection {
    videoContainer = {};
    message = []
    settings = null;
    streaming = false;
    myPeer = null;
    socket = socket;
    isSocketConnected = false;
    isPeersConnected= false;
    myID = '';

    constructor(settings) {
        this.settings = settings;
        this.myPeer = initializePeerConnection(this.settings.params.id);
        socket = io();
        if (socket) this.isSocketConnected = true; 
        if (this.myPeer) this.isPeersConnected = true;
        this.initializeSocketEvents();
        this.initializePeersEvents();
    }

    initializeSocketEvents = () => {
        socket.on('connect', () => {
            console.log('socket connected');
        });
        socket.on('user-disconnected', (userID) => {
            console.log('user disconnected-- closing peers', userID);
            peers[userID] && peers[userID].close();
            this.removeVideo(userID);
        });
        socket.on('disconnect', () => {
            console.log('socket disconnected --');
        });
        socket.on('error', (err) => {
            console.log('socket error --', err);
        });
        socket.on('display-media', (data) => {
            if (data.value) checkAndAddClass(this.getMyVideo(data.userID), 'displayMedia');
            else checkAndAddClass(this.getMyVideo(data.userID), 'userMedia');
        });
        socket.on('user-video-off', (data) => {
            changeMediaView(data.id, data.status);
        });
    }

    initializePeersEvents = () => {
        this.myPeer.on('open', (id) => {
            const { userDetails } = this.settings;
            this.myID = id;
            const roomID = "main"
            const userData = {
                userID: id, roomID, ...userDetails
            }
            console.log('peers established and joined room', userData);
            socket.emit('join-room', userData);
            this.setPeersListeners();
            this.setNavigatorToStream();
        });
        this.myPeer.on('error', (err) => {
            console.log('peer connection error', err);
            this.myPeer.reconnect();
        })
    }

    setNavigatorToStream = (userData) => {
        this.getVideoAudioStream(true, true)
        // this.getVideoAudioStream().then((stream) => {
        //     if (stream) {
        //         // this.streaming = true;
        //         // this.settings.updateInstance('streaming', true);
        //         // this.createVideo({ id: this.myID, stream });
        //         // this.setPeersListeners(stream);
        //         // this.newUserConnection(stream);
        //     }
        // })
    }

    getVideoAudioStream = (video, audio) => {
        let quality = this.settings.params && this.settings.params.quality;
        if (quality) quality = parseInt(quality);
        // console.log(navigator)
            navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
              })
              .then((stream) => {
                   if (stream) {
                        this.streaming = true;
                        this.settings.updateInstance('streaming', true);
                        this.createVideo({ id: this.myID, stream });
                        this.newUserConnection(stream);
                        // this.setPeersListeners(stream);
                    }
               
            });

    }

    setPeersListeners = (stream) => {

       
        this.myPeer.on('call', (call) => {
            call.answer(stream);
            call.on('stream', (userVideoStream) => {
                this.createVideo({ id: call.metadata.id, stream: userVideoStream });
            });
            call.on('close', () => {
                console.log('closing peers listeners', call.metadata.id);
                this.removeVideo(call.metadata.id);
            });
            call.on('error', () => {
                console.log('peer error ------');
                this.removeVideo(call.metadata.id);
            });
            peers[call.metadata.id] = call;
        });

       
    }

    newUserConnection = (stream) => {
        socket.on('new-user-connect', (userData) => {
            console.log('New User Connected', userData);
            this.connectToNewUser(userData, stream);

        });
    }

    connectToNewUser(userData, stream) {
        const { userID } = userData;
        const call = this.myPeer.call(userID, stream, { metadata: { id: this.myID } });
        call.on('stream', (userVideoStream) => {

            this.createVideo({ id: userID, stream: userVideoStream, userData });
        });
        call.on('close', () => {
            console.log('closing new user', userID);
            this.removeVideo(userID);
        });
        call.on('error', () => {
            console.log('peer error ------')
            this.removeVideo(userID);
        })
        peers[userID] = call;
    }

    boradcastMessage = (message) => {
        this.message.push(message);
        this.settings.updateInstance('message', this.message);
        socket.emit('broadcast-message', message);
    }

    createVideo = (createObj) => {
        if (!this.videoContainer[createObj.id]) {
            this.videoContainer[createObj.id] = {
                ...createObj,
            };
            const roomContainer = document.getElementById('room-container');
            const videoContainer = document.createElement('div');
            const mute = document.createElement('span');
            mute.setAttribute("class", "mute")
            const video = document.createElement('video');
            
            video.srcObject = this.videoContainer[createObj.id].stream;
            video.id = createObj.id;
            // video.setAttribute("muted", "")
            video.setAttribute("muted", "")
            video.setAttribute("playsinline", "")
            video.setAttribute("autoplay", "")
            video.autoplay = true

            mute.onclick = function() {
                video.muted = false;
                mute.remove()
              }
            if (this.myID === createObj.id) video.muted = true;
            videoContainer.appendChild(video)
            roomContainer.append(videoContainer);
            roomContainer.append(mute);
        } else {
            // @ts-ignore
            if(document.getElementById(createObj.id)) {
                document.getElementById(createObj.id).srcObject = createObj.stream;
            }
        }
    }

    reInitializeStream = (video, audio, type) => {
        // @ts-ignore
        const media = type === 'userMedia' ? this.getVideoAudioStream(video, audio) : navigator.mediaDevices.getDisplayMedia();
        return new Promise((resolve) => {
            media.then((stream) => {
                // @ts-ignore
                const myVideo = this.getMyVideo();
                if (type === 'displayMedia') {
                    this.toggleVideoTrack({audio, video});
                    this.listenToEndStream(stream, {video, audio});
                    socket.emit('display-media', true);
                }
                checkAndAddClass(myVideo, type);
                this.createVideo({ id: this.myID, stream });
                replaceStream(stream);
                resolve(true);
            });
        });
       
    }
    
    removeVideo = (id) => {
        delete this.videoContainer[id];
        const video = document.getElementById(id);
        if (video) video.remove();
    }

    destoryConnection = () => {
        const myMediaTracks = this.videoContainer[this.myID] && this.videoContainer[this.myID].stream.getTracks();
        if(myMediaTracks) {
            myMediaTracks.forEach((track) => {
                track.stop();
            })
        }

        if(socketInstance) {
            socketInstance.socket.disconnect();
        }
        
        this.myPeer.destroy();
    }

    getMyVideo = (id) => {
        return document.getElementById(id);
    }

    listenToEndStream = (stream, status) => {
        const videoTrack = stream.getVideoTracks();
        if (videoTrack[0]) {
            videoTrack[0].onended = () => {
                socket.emit('display-media', false);
                this.reInitializeStream(status.video, status.audio, 'userMedia');
                this.settings.updateInstance('displayStream', false);
                this.toggleVideoTrack(status);
            }
        }
    };

    toggleVideoTrack = (status) => {
        const myVideo = this.getMyVideo();
        // @ts-ignore
        if (myVideo && !status.video && myVideo.srcObject) myVideo.srcObject.getVideoTracks().forEach((track) => {
            if (track.kind === 'video') {
                // track.enabled = status.video;
                // socket.emit('user-video-off', {id: this.myID, status: true});
                // changeMediaView(this.myID, true);
                !status.video && track.stop();
            }
        });
        else if (myVideo) {
            // socket.emit('user-video-off', {id: this.myID, status: false});
            // changeMediaView(this.myID, false);
            this.reInitializeStream(status.video, status.audio);
        }
    }

    toggleAudioTrack = (status) => {
        const myVideo = this.getMyVideo();
        // @ts-ignore
        if (myVideo && myVideo.srcObject) myVideo.srcObject.getAudioTracks().forEach((track) => {
            if (track.kind === 'audio')
                track.enabled = status.audio;
                status.audio ? this.reInitializeStream(status.video, status.audio) : track.stop();
        });
    }

}

const initializePeerConnection = (id) => {
     
    return new Peer(id, {
        host: "tickerrrpeer.herokuapp.com",
        port: 80
    });
}

const initializeSocketConnection = () => {
    return openSocket.connect(socket, {
        secure: true, 
        reconnection: true, 
        rejectUnauthorized: false,
        reconnectionAttempts: 10
    });
}

const replaceStream = (mediaStream) => {
    Object.values(peers).map((peer) => {
        if(peer.peerConnection) {
            peer.peerConnection.getSenders().map((sender) => {
                if(sender.track.kind == "audio") {
                    if(mediaStream.getAudioTracks().length > 0){
                        sender.replaceTrack(mediaStream.getAudioTracks()[0]);
                    }
                }
                if(sender.track.kind == "video") {
                    if(mediaStream.getVideoTracks().length > 0){
                        sender.replaceTrack(mediaStream.getVideoTracks()[0]);
                    }
                }
            });
        }
    })
}

const checkAndAddClass = (video, type) => {
    // if (video && video.classList && video.classList.length === 0 && type === 'displayMedia')  
    //     video.classList.add('display-media');
    // else 
    //     video.classList.remove('display-media');
}

const changeMediaView = (userID, status) => {
    const userVideoDOM = document.getElementById(userID);
    if (status) {
        const clientPosition = userVideoDOM.getBoundingClientRect();
        const createdCanvas = document.createElement("SPAN");
        createdCanvas.className = userID;
        createdCanvas.style.position = 'absolute';
        createdCanvas.style.left = `${clientPosition.left}px`;
        createdCanvas.style.top = `${clientPosition.top}px`;
        // createdCanvas.style.width = `${userVideoDOM.videoWidth}px`;
        // createdCanvas.style.height = `${clientPosition.height}px`;
        createdCanvas.style.width = '100%';
        createdCanvas.style.height = '100%';
        createdCanvas.style.backgroundColor = 'green';
        userVideoDOM.parentElement.appendChild(createdCanvas);
    } else {
        const canvasElement = document.getElementsByClassName(userID);
        if (canvasElement[0]) canvasElement[0].remove();
    }
}

export function createSocketConnectionInstance(settings) {
    return socketInstance = new SocketConnection(settings);
}
