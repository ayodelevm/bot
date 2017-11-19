export default (token) => {
    const ask = (message) => {
        console.log({ask: message, token})
    }

    return {
        ask
    }
}