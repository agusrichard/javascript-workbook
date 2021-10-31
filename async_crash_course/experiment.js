function one() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('One is done')
            resolve(true)
        }, 3000)
    })
}

function two() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Two is done')
            resolve(true)
        }, 2500)
    })
}

async function aggregator() {
    try {
        const start = new Date()
        const resultOne = await one()
        const resultTwo = await two()
        console.log('resultOne', resultOne)
        console.log('resultTwo', resultTwo)
        const end = new Date()
        console.log('Time taken', end - start)
    } catch (error) {
        console.log('error', error)
        return error
    }
}

aggregator()