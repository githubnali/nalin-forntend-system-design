const PROTO_PATH = './customer.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const pacaketDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const customerProto = grpc.loadPackageDefinition(pacaketDefinition).customer;

const server = new grpc.Server();

const customers = [
    {
        id: 'sdbvfaevea',
        name: 'Nagaraju Nali',
        age: 28,
        address: 'Banglore'
    },
    {
        id: 'liwvciwcqcxw',
        name: 'Chiranjeevi',
        age: 25,
        address: 'Uttrakhand'
    }
]
server.addService(customerProto.CustomerService.service, {
    getAll: (call, callback) => {
        callback(null, { customers });
    },
    get: (call, callback) => {

    },
    insert: (call, callback) => {

    },
    update: (call, callback) => {

    },
    remove: (call, callback) => {

    }

})

server.bind("127.0.01:30043", grpc.ServerCredentials.createInsecure());
server.start();