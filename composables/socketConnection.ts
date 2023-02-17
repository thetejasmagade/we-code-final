import { io } from 'socket.io-client'

const socket = io('http://localhost:4000/')


let joinSocketRoom: any = (room_id: any, user_name: any, room_name: any): any => {
    return new Promise((resolve, reject) => {
        socket.emit("join-room", room_id, user_name, room_name, (message: any) => {
            resolve(message);
        })
    });
}

let leaveRoom = (room_id: any, room_name: any) => {
    socket.emit('leave', room_id, room_name, (message: any) => {
        console.log(message);
    });
    socket.disconnect();
}

let checkConnectedClients = (room_id: any, room_name: any) => {
    socket.emit("check-clients", room_id, room_name, (message: any) => {
        console.log(message);
    })
}

export { joinSocketRoom, leaveRoom, checkConnectedClients }