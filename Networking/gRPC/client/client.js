const PROTO_PATH = './customer.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const pacaketDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const CustomerService = grpc.loadPackageDefinition(pacaketDefinition).customer;

const client = new CustomerService(
    "127.0.0.1:30043",
    grpc.ServiceCredentials.createInsecure()
)

module.exports = client;