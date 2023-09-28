import {AnyAction, createSlice, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import {Todo} from "../type/todo";
import {AppDispatch, RootState} from "./store";

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

export const todoSlice = createSlice({
    name: 'todo',
    initialState: initialState,
    reducers: {
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

export const asyncAddTodo = (todo: Todo, timeMilliSeconds: number): any => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(toggleTodo(1))
        console.log(getState().todo)
        setTimeout(() => {
            dispatch(addTodo(todo))
            console.log(getState().todo)
        }, timeMilliSeconds)
    }
}

export const {addTodo, deleteTodo, toggleTodo} = todoSlice.actions
export const selectTodo = (state: RootState) => state.todo
export default todoSlice.reducer
