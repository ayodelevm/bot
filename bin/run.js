import http from 'http'
import dotenv from 'dotenv'
import service from '../server/service'
import slackClient, { addAuthenticatedHandler } from '../server/slackClient'
import witAiClient from '../server/witClient'

dotenv.config()

const server = http.createServer(service)

const bot_token = process.env.api_token;
const wit_token = process.env.wit_token;

const witClient = witAiClient(wit_token);

const rtm = slackClient(bot_token, 'verbose', witClient)

rtm.start()

addAuthenticatedHandler(rtm, () => server.listen(5012))

server.on('listening', () => {
    console.log(`server is listening on ${server.address().port} in ${service.get('env')} mode`)
})