# Creating a CRUD API with Node, Express, and gRPC

<br />

## Introduction

- HTTP/2, for example, was born through a myriad of optimizations that led the web to a more robust, faster, and lighter zone than we’ve ever been before.
- gRPC is a modern open source high performance RPC framework that can run in any environment.
- It’s backed in HTTP/2, cross platform, and open source. It’s also compact in regards to its size.
- This is how its workflow looks:
  ![Something in here](https://blog.logrocket.com/wp-content/uploads/2020/04/gRPC-server-768x495.png)
- The whole architecture is based in the known client-server structure.
- A gRPC client app can make direct requests to a server application. Both client and server embrace a common interface, like a contract, in which it determines what methods, types, and returns each of the operations is going to have.
- The server assures that the interface will be provided by its services, while the client has stubs to guarantee that the methods are alike.
- It also uses the Protocol Buffer to serialize and deserialize request and response data, instead of JSON or XML, for example.
- Protocol buffers are Google’s language-neutral, platform-neutral, extensible mechanism for serializing structured data — think XML, but smaller, faster, and simpler.
- First, you need to create and define the protobuf file, which will contain code made under the Interface Definition Language specified by the protocol itself (more on that later).
- This whole process is made under the hood, so don’t worry, you won’t see lots of boilerplate code around. In the end, along with the generated code, you can go to the implementation of the server and client.

## Setup

- File structure:
  ![](https://blog.logrocket.com/wp-content/uploads/2020/04/LOGROCKET-CLIENT.png)
- Command to install:
  ```shell
  npm install --save grpc @grpc/proto-loader uuid express hbs body-parser
  ```

### The server

- `customers.proto`:

  ```text
  syntax = "proto3";

  service CustomerService {
      rpc GetAll (Empty) returns (CustomerList) {}
      rpc Get (CustomerRequestId) returns (Customer) {}
      rpc Insert (Customer) returns (Customer) {}
      rpc Update (Customer) returns (Customer) {}
      rpc Remove (CustomerRequestId) returns (Empty) {}
  }

  message Empty {}

  message Customer {
      string id = 1;
      string name = 2;
      int32 age = 3;
      string address = 4;
  }

  message CustomerList {
      repeated Customer customers = 1;
  }

  message CustomerRequestId {
      string id = 1;
  }
  ```

- Explanations:
  - The first line states the version of protobuf we’ll use — in this case, the latest one.
  - The syntax of the content reassembles a lot of JSON. The service is the interface contract we’ve talked about. Here you’ll place the method names, params, and return types of each gRPC call.
  - The types, when not a primitive one, must be stated through the message keyword. Please refer to the docs to see all the allowed types.
  - Each of a message’s properties has to receive a number value that represents the order of this property in the stack, starting with 1.
  - Finally, for arrays, you need to use the repeated keyword before the declaration’s property.
- `server.js`:

  ```javascript
  const PROTO_PATH = "./customers.proto";

  var grpc = require("grpc");
  var protoLoader = require("@grpc/proto-loader");

  var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
  });

  var customersProto = grpc.loadPackageDefinition(packageDefinition);

  const { v4: uuidv4 } = require("uuid");

  const server = new grpc.Server();
  const customers = [
    {
      id: "a68b823c-7ca6-44bc-b721-fb4d5312cafc",
      name: "John Bolton",
      age: 23,
      address: "Address 1",
    },
    {
      id: "34415c7c-f82d-4e44-88ca-ae2a1aaa92b7",
      name: "Mary Anne",
      age: 45,
      address: "Address 2",
    },
  ];

  server.addService(customersProto.CustomerService.service, {
    getAll: (_, callback) => {
      callback(null, { customers });
    },

    get: (call, callback) => {
      let customer = customers.find((n) => n.id == call.request.id);

      if (customer) {
        callback(null, customer);
      } else {
        callback({
          code: grpc.status.NOT_FOUND,
          details: "Not found",
        });
      }
    },

    insert: (call, callback) => {
      let customer = call.request;

      customer.id = uuidv4();
      customers.push(customer);
      callback(null, customer);
    },

    update: (call, callback) => {
      let existingCustomer = customers.find((n) => n.id == call.request.id);

      if (existingCustomer) {
        existingCustomer.name = call.request.name;
        existingCustomer.age = call.request.age;
        existingCustomer.address = call.request.address;
        callback(null, existingCustomer);
      } else {
        callback({
          code: grpc.status.NOT_FOUND,
          details: "Not found",
        });
      }
    },

    remove: (call, callback) => {
      let existingCustomerIndex = customers.findIndex(
        (n) => n.id == call.request.id
      );

      if (existingCustomerIndex != -1) {
        customers.splice(existingCustomerIndex, 1);
        callback(null, {});
      } else {
        callback({
          code: grpc.status.NOT_FOUND,
          details: "Not found",
        });
      }
    },
  });

  server.bind("127.0.0.1:30043", grpc.ServerCredentials.createInsecure());
  console.log("Server running at http://127.0.0.1:30043");
  server.start();
  ```

- Explanations:
  - First, import the proto file path to a constant.
  - Then, require both grpc and @grpc/proto-loader packages. They’re the ones that’ll make the magic happen. In order to have a proto transcripted into a JavaScript object, you need to set its package definition first. protoLoader will take care of this task by receiving the path where the proto file is located as the first param, and the setting properties as the second.
  - Once you have the package definition object in hand, you pass it over to the loadPackageDefinition function of grpc object that, in turn, will return it to you. Then, you can create the server via Server() function.
  - The customers array is our in-memory database.
  - We’re initializing it with two customers already so you can see some data when the apps start up. On the server, we need to tell the server object which services it’ll take care of (in our case, the CustomerService we’ve created in the proto file). Each of the operations must match their names with the proto ones respectively. Their codes are easy and very straightforward, so go ahead and take a look at them.
  - In the end, bind the server connection to the desired IP and port and start it up. The bind() function received the authentication object as the second parameter, but for simplicity we’ll use it insecurely as you may notice (not recommended for production).
- Run the server:
  ```shell
  npm start
  ```

### The Client

- Let’s build our client application now, starting with the client.js code:

  ```javascript
  const PROTO_PATH = "../customers.proto";

  const grpc = require("grpc");
  const protoLoader = require("@grpc/proto-loader");

  var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
  });

  const CustomerService =
    grpc.loadPackageDefinition(packageDefinition).CustomerService;
  const client = new CustomerService(
    "localhost:30043",
    grpc.credentials.createInsecure()
  );

  module.exports = client;
  ```

- This file will exclusively handle our communication with the gRPC server.
- Note that its initial structure is exactly the same as in the server file because the same gRPC objects handle the client and server instances.
- The only difference here is that there’s no such method like Client().
- All we need is to load the package definition and create a new service — the same one we’ve created in the server — over the same IP and port. If you have credentials set, the second param must meet the settings as well.
- Express server, `client/index.js`:

  ```javascript
  const client = require("./client");

  const path = require("path");
  const express = require("express");
  const bodyParser = require("body-parser");

  const app = express();

  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "hbs");

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get("/", (req, res) => {
    client.getAll(null, (err, data) => {
      if (!err) {
        res.render("customers", {
          results: data.customers,
        });
      }
    });
  });

  app.post("/save", (req, res) => {
    let newCustomer = {
      name: req.body.name,
      age: req.body.age,
      address: req.body.address,
    };

    client.insert(newCustomer, (err, data) => {
      if (err) throw err;

      console.log("Customer created successfully", data);
      res.redirect("/");
    });
  });

  app.post("/update", (req, res) => {
    const updateCustomer = {
      id: req.body.id,
      name: req.body.name,
      age: req.body.age,
      address: req.body.address,
    };

    client.update(updateCustomer, (err, data) => {
      if (err) throw err;

      console.log("Customer updated successfully", data);
      res.redirect("/");
    });
  });

  app.post("/remove", (req, res) => {
    client.remove({ id: req.body.customer_id }, (err, _) => {
      if (err) throw err;

      console.log("Customer removed successfully");
      res.redirect("/");
    });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log("Server running at port %d", PORT);
  });
  ```

## Resource:

- https://blog.logrocket.com/creating-a-crud-api-with-node-express-and-grpc/
