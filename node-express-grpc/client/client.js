const PROTO_PATH = "./todo.proto"

const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader")

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
})

const TodoService = grpc.loadPackageDefinition(packageDefinition).TodoService
const client = new TodoService(
    "localhost:30043",
    grpc.credentials.createInsecure()
)

module.exports = client