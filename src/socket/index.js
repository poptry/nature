// import { reactive } from "vue";
// import { io } from "socket.io-client";

// export const socket_state = reactive({
//   connected: false,
//   fooEvents: [],
//   barEvents: []
// });

// // "undefined" means the URL will be computed from the `window.location` object
// const URL = "http://localhost:3000";

// export const socket = io(URL);

// socket.on("connect", () => {
//     socket_state.connected = true;
// });

// socket.on("disconnect", () => {
//     socket_state.connected = false;
// });

// socket.on("foo", (...args) => {
//     socket_state.fooEvents.push(args);
// });

// socket.on("bar", (...args) => {
//     socket_state.barEvents.push(args);
// });
// socket.on("sendMsg",(...args)=>{
    
// })