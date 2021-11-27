const axios = require('axios')
const express = require('express')

const app = express()


app.get('/', async (req, res) => {
    try {
        await axios.get('http://localhost:3000')
        res.send('Hello World!')
    } catch (error) {
        const status = error.response.status
        console.log('response.state', error.response.status)
        if (status === 404) {
            res.send('Not found')
        } else if (status === 400) {
            res.send('Bad request')
        } else {
            res.send('Something went wrong')
        }
    }
})

app.listen(5000)