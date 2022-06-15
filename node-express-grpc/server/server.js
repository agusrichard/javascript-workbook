const PROTO_PATH = "./todo.proto"

const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
})

const todosProto = grpc.loadPackageDefinition(packageDefinition)

const { v4: uuidv4 } = require("uuid")

const server = new grpc.Server()
var todos = [
    {
        id: "a68b823c-7ca6-44bc-b721-fb4d5312cafc",
        title: "Buy milk",
        description: "Milk is needed for the baby",
        completed: false
    },
    {
        id: "34415c7c-f82d-4e44-88ca-ae2a1aaa92b7",
        title: "Buy eggs",
        description: "Eggs are needed for the baby",
        completed: false
    },
]

server.addService(todosProto.TodoService.service, {
    getAll: (_, callback) => {
        callback(null, { todos })
    },
    getById: (call, callback) => {
        const todo = todos.find(t => t.id === call.request.id)
        if (todo) {
            callback(null, todo)
            return
        }

        callback({
            code: grpc.status.NOT_FOUND,
            details: "Not found"
        })
    },
    create: (call, callback) => {
        const todo = call.request
        todo.id = uuidv4()
        todos.push(todo)
        callback(null, todo)
    },
    update: (call, callback) => {
        const todo = call.request
        const index = todos.findIndex(t => t.id === todo.id)
        if (index !== -1) {
            todos[index] = todo
            callback(null, todo)
            return
        }

        callback({
            code: grpc.status.NOT_FOUND,
            details: "Not found"
        })
    },
    delete: (call, callback) => {
        const updatedTodos = todos.filter(t => t.id !== call.request.id)
        if (updatedTodos.length !== todos.length) {
            todos = updatedTodos
            callback(null, {})
            return
        }

        callback({
            code: grpc.status.NOT_FOUND,
            details: "Not found"
        })
    }
})

server.bind("127.0.0.1:30043", grpc.ServerCredentials.createInsecure())
console.log("Server running at http://127.0.0.1:30043")
server.start()