// const express = require('express');
const client = require('./client');

import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, resp) => {
    client.getAll(null, (err, data) => {
        if(!err) {

            resp.send(data.custoimers);
        }
    })
})

app.post("/create", (req, resp) => {
    let newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    }
    client.insert(newCustomer, (err, data) => {
        if (err) throw err;
        console.log("New Customer Created", data);
        resp.send({message: "New Customer Created Successfully"});
    })
})

app.post("/update", (req, resp) => {
    let newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    }
    client.update(newCustomer, (err, data) => {
        if (err) throw err;
        console.log("Customer Updated Successfully", data);
        resp.send({message: "Customer Updated Successfully"});
    })
})

app.post("/remove:id", (req, resp) => {
    let customerId = req.params.id;
    client.remove({id: customerId}, (err, data) => {
        if (err) throw err;
        console.log("Customer Deleted Successfully", data);
        resp.send({message: "Customer Deleted Successfully"});
    })
})

const PORT = 5111;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})