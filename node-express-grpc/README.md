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

- The first line states the version of protobuf we’ll use — in this case, the latest one.
- The syntax of the content reassembles a lot of JSON. The service is the interface contract we’ve talked about. Here you’ll place the method names, params, and return types of each gRPC call.
- The types, when not a primitive one, must be stated through the message keyword. Please refer to the docs to see all the allowed types.
- Each of a message’s properties has to receive a number value that represents the order of this property in the stack, starting with 1.
- Finally, for arrays, you need to use the repeated keyword before the declaration’s property.

## Resource:

- https://blog.logrocket.com/creating-a-crud-api-with-node-express-and-grpc/
