import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Todo} from "../type/todo";
import {AppDispatch, RootState} from "./store";
import {fakeApiCall} from "../fake/api";

const initialState: Todo[] = [
    {
        id: 1,
        title: "Faire la vaisselle",
        completed: false
    },
    {
        id: 2,
        title: "Donner cours sur Redux toolkit",
        completed: true
    }
]

// Je crée une fonction synchrone qui me va me retourner une action asynchrone
export const asyncAddTodo = (todo: Todo, timeMilliSeconds: number): any => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        // Je vais faire mon call API
        let res = await fakeApiCall(todo, timeMilliSeconds)
        // et attendre le résultat avant de le dispatcher
        dispatch(addTodo(res))
        console.log(getState().todo)
    }
}

export const todoSlice = createSlice({
    name: 'todo',               // Utilisé en interne pour nommer mes actions
    initialState: initialState, // Mon état initial
    reducers: {                 // Tous mes reducers
        addTodo: (state, action: PayloadAction<Todo>) => {
            return [
                ...state,
                action.payload
            ]
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            return state.filter(todo => todo.id !== action.payload)
        },
        toggleTodo: (state, action: PayloadAction<number>) => {
            return state.map(todo => {
                if (todo.id === action.payload) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                } else {
                    return todo
                }
            })
        }
    }
})

export const {
    addTodo,
    deleteTodo,
    toggleTodo
} = todoSlice.actions

export default todoSlice.reducer

export const selectTodo = (state: RootState) => state.todo
