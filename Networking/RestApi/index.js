// const express = require('express');

import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json())

app.all('/', (req, resp) => {

    resp.send(`I'm up!`)

})

// in memory database
const todos = [
    {
        id: '1',
        title: 'Task 1',
        completed: false
    },
    {
        id: '2',
        title: 'Task 2',
        completed: false
    },{
        id: '3',
        title: 'Task 3',
        completed: true
    },{
        id: '4',
        title: 'Task 4',
        completed: false
    },
]

// READ
app.get('/todos', (req, resp) => {
    resp.json(todos)
})
//CREATE
app.post('/todos', (req, resp) => {
    const newTodo = req.body
    todos.push(newTodo)

    resp.json({
        message: 'New Todo Added!' 
    })
})

//UPDATE
app.put('/todos/:id', (req, resp) => {
    const newTodoData = req.body

    const todoParamId = req.params.id

    const todoIndex = todos.findIndex(td => td.id  === todoParamId);
    
    if(todoIndex !== -1) {
        todos[todoIndex] = {
            id: todoParamId,
            ...newTodoData
        }
    }

    resp.json({
        Message: 'Todo Updated Successfully!'
    })
})

//DELETE
app.delete('/todos/:id', (req, resp) => {
    const todoParamId = req.params.id

    const todoIndex = todos.findIndex(td => td.id  === todoParamId);

    if(todoIndex !== -1) {
        todos.splice(todoIndex, 1)
    }

    resp.json({
        Message: 'Todo Deleted Successfully!'
    })

})


const PORT = 5111;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})