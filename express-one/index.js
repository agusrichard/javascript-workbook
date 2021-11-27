const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.status(300).send('Hello World!')
})

app.listen(3000)