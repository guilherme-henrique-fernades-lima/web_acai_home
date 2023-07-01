import { Server } from 'socket.io'


const SocketHandler = (req, res) => {

    if (res.socket.server.io) {
        console.log('Socket já está rodando')

    } else {
        console.log('Socket foi inicializado')
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection', (socket) => {

            socket.on('NEW_ORDER_DELIVERY', value => {
                socket.broadcast.emit('NEW_ORDER_DELIVERY', value)
            })

            socket.on('REMOVE_ORDER_DELIVERY', value => {
                socket.broadcast.emit('REMOVE_ORDER_DELIVERY', value)
            })

            socket.on('FINISH_ORDER_DELIVERY', value => {
                socket.broadcast.emit('FINISH_ORDER_DELIVERY', value)
            })

        });
    }

    res.end()
}

export default SocketHandler