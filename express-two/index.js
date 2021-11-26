const axios = require('axios')
const express = require('express')

const app = express()


app.get('/', async (req, res) => {
    try {
        await axios.get('http://localhost:3000')
        res.send('Hello World!')
    } catch (error) {
        console.log('error response', error.response)
        res.send('error')
    }
})

app.listen(5000)