import {Router} from 'express';

import {Todo} from '../models/todo';

let todos: Todo[] = [];

const router = Router();

router.get('/', (req, res, next) => {
    res.status(200).json(todos);
});

router.post('/todo', (req, res, next) => {
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: req.body.text
    };

    todos.push(newTodo);
    res.status(201).json({msg: 'Added todo', todo: newTodo, todos});
});

router.put('/todo/:todoId', (req, res, next) => {
    const tid = req.params.todoId;
    const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
    if(todoIndex >= 0){
        todos[todoIndex] = {
            id: todos[todoIndex].id,
            text: req.body.text
        };
        return res.status(200).json({msg: 'updated todo', todos});
    }
    res.status(404).json({msg: 'No todo found with this id'});
});

router.delete('/todo/:todoId', (req, res, next) => {
    const tid = req.params.todoId;
    const newTodos = todos.filter((todoItem) => todoItem.id !== tid);
    if(newTodos.length === todos.length){
        return res.status(404).json({msg: 'No todo found with this id'});
    }
    todos = [...newTodos];
    res.status(200).json({msg: 'Todo deleted', todos});
});

export default router;