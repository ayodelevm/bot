const RtmClient = require('@slack/client').RtmClient;

const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;

let rtm;
let nlp;

const handleOnAuthenticated = (rtmStartData) => {
    console.log(`Logged in as ${rtmStartData.self.name} of workspace ${rtmStartData.team.name}, but not yet connected to a channel`)
}

const handleOnMessage = () => {
    rtm.on('message', (message) => {
        console.log(message)
        nlp.ask(message.text)
        rtm.sendMessage("Hello!", message.channel);        
    })
}

export const addAuthenticatedHandler = (rtm, handler) => {
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handler)
}

export default (bot_token, logLevel, witClient) => {
    nlp = witClient;
    rtm = new RtmClient(bot_token, {logLevel});
    addAuthenticatedHandler(rtm, handleOnAuthenticated);
    rtm.on(RTM_EVENTS.RTM_CONNECTION_OPENED, handleOnMessage);
    return rtm;
}
