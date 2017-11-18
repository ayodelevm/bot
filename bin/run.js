import http from 'http'
import service from '../server/service'

const server = http.createServer(service)

server.listen(5012)

server.on('listening', () => {
    console.log(`server is listening on ${server.address().port} in ${service.get('env')} mode`)
})