function useless() {
    console.log('doing some expensive operation here')
    return 21
}

function amazingFunction(num, callback) {
    return num + callback()
}

module.exports = { useless, amazingFunction }