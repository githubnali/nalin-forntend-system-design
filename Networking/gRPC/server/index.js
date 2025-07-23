const PROTO_PATH = './customer.proto';
const grpc = require('@grpc/grpc-js');
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
        const customerId = call.request.id;
        const customer = customers.find(c => c.id === customerId);
        
        if(customer) {
            callback(null, customer);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Customer not found"
            });
        }
    },
    insert: (call, callback) => {
        const newCustomer = call.request;
        newCustomer.id = Math.random().toString(36).substring(2, 15); // Generate a random ID
        customers.push(newCustomer);
        callback(null, newCustomer);
    },
    update: (call, callback) => {
        let exisitingCustomer = customers.find(c => c.id === call.request.id);
        if(exisitingCustomer) { 
            exisitingCustomer.name
            = call.request.name;
            exisitingCustomer.age = call.request.age;   
            exisitingCustomer.address = call.request.address;
            callback(null, exisitingCustomer);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Customer not found"
            });
        }
    },
    remove: (call, callback) => {
        const customerId = call.request.id;
        const customerIndex = customers.findIndex(c => c.id === customerId);
        
        if(customerIndex !== -1) {
            customers.splice(customerIndex, 1);
            callback(null, { message: "Customer deleted successfully" });
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Customer not found"
            });
        }
    }

})

server.bindAsync("127.0.01:30043", grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {    
    console.error("Error binding in gRPC server:", err);
    
  }else {
    server.start();
    console.log(`gRPC server is running at port ${port}`);
  }
});