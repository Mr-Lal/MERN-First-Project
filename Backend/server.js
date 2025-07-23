import app from "./app.js";
import http from "http";
import { Server } from 'socket.io'


const server=http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log('User connected: ', socket.id)

  socket.on('add_todo', (todo) => {
    // Broadcast to all users except sender
    socket.broadcast.emit('todo_added', todo)
  })

  socket.on('update_todo', (todo) => {
    socket.broadcast.emit('todo_updated', todo)
  })

  socket.on('delete_todo', (id) => {
    socket.broadcast.emit('todo_deleted', id)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})



const PORT=process.env.PORT || 3000;
server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})