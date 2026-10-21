import { socket } from '@/lib/socket'

export function connectSocket(): void {
    if (!socket.connected) {
        socket.connect()
    }
}

export function disconnectSocket(): void {
    socket.disconnect()
}