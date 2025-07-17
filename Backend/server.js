import app from "./app.js";
import http from "http";
import { Server } from 'socket.io'


const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:'*'
    }
})

app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on('connection',(socket)=>{
    console.log(`New client connected: ${socket.id}`);
    
})

io.on('disconnect',(socket)=>{
    console.log(`Client disconnected: ${socket.id}`);
})



const PORT=process.env.PORT || 3000;
server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})