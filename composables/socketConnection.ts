import { io } from 'socket.io-client'

const socket = io('http://localhost:4000/')

let leaveRoom = (room_id: any, room_name: any) => {
    socket.emit('leave', room_id, room_name, (message: any) => {
        console.log(message);
    });
}

let leaveAdminRoom = (socket_id: any, room_id: any, room_name: any) => {
    socket.emit('remove-admin', socket_id, room_id, room_name, (message: any) => {
        console.log(message);
    });
}

let joinSocketRoom: any = (room_id: any, user_name: any, room_name: any): any => {
    return new Promise((resolve, reject) => {
        socket.emit("join-room", room_id, user_name, room_name, (message: any) => {
            resolve(message);
        })
    });
}

export { joinSocketRoom, leaveRoom, leaveAdminRoom }