import {Todo} from "../type/todo";

export const fakeApiCall = async (todo: Todo, timeMilliSeconds: number): Promise<Todo> => {
    return new Promise<Todo>(resolve => {
        setTimeout(() => {
            resolve(todo)
        }, timeMilliSeconds)
    })
}

