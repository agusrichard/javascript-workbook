const client = require("./client")

const path = require("path")
const express = require("express")
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (_, res) => {
    res.json({
        "message": "Hello World"
    })
})

app.get("/get-all", (_, res) => {
    client.getAll(null, (err, data) => {
        if (err) {
            res.status(500).json({
                "message": "Error"
            })
        } else {
            res.json(data)
        }
    })
})

app.get("/get-by-id/:todoId", (req, res) => {
    client.getById({ id: req.params.todoId }, (err, data) => {
        if (err) {
            res.status(500).json({
                "message": "Error"
            })
        } else {
            res.json(data)
        }
    })
})

app.post("/create", (req, res) => {
    const newtodo = req.body
    client.create(newtodo, (err, data) => {
        if (err) throw err
        res.json(data)
    })
})

app.put("/update", (req, res) => {
    const todo = req.body
    client.update(todo, (err, data) => {
        if (err) throw err
        res.json(data)
    })
})

app.delete("/delete/:todoId", (req, res) => {
    client.delete({ id: req.params.todoId }, (err, _) => {
        if (err) throw err
        res.sendStatus(204)
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running at port %d", PORT);
});