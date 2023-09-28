import React from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./hook/reduxHooks";
import {addTodo, asyncAddTodo, deleteTodo, toggleTodo} from "./store/todoStore";

function App() {
    const todos = useAppSelector(state => state.todo)
    const dispatch = useAppDispatch()

    const handleAdd = () => {
        dispatch(addTodo({
            id: 3,
            title: "Ajouter un todo",
            completed: false
        }))
    }

    const handleAddAsync = () => {
        dispatch(asyncAddTodo({
            id: 4,
            title: "Ajouter un todo async",
            completed: true
        }, 2000))
    }

    const handleToggle = () => {
        dispatch(toggleTodo(3))
    }

    const handleDelete = () => {
        dispatch(deleteTodo(2))
    }

    return (
        <div className="App" style={{marginTop: "50px"}}>

            <button onClick={handleAdd}>Add</button>
            <button onClick={handleAddAsync}>Add Async</button>
            <button onClick={handleToggle}>Toggle</button>
            <button onClick={handleDelete}>Delete</button>

            <h1>Hello monde</h1>
            <ul>
                {todos.map(todo => <li
                    key={todo.id}>{todo.id} | {todo.title} | {todo.completed ? 'done' : 'not done'}</li>)}
            </ul>
        </div>
    );
}

export default App;
