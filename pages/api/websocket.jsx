import { Server } from 'socket.io'


const SocketHandler = (req, res) => {

    if (res.socket.server.io) {
        console.log('Socket já está rodando')

    } else {
        console.log('Socket foi inicializado')
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection', (socket) => {

            socket.on('NOVO_PEDIDO', value => {
                socket.broadcast.emit('NOVO_PEDIDO', value)
            })

        });
    }

    res.end()
}

export default SocketHandler