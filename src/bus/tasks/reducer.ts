import { createReducer } from "@reduxjs/toolkit";
import { tasksActions } from "./actions";

const InitialState = {
    loading: false,
    error: null,
    data: null
}

export const tasksReducer = createReducer(InitialState, (builder) => {
    builder.addCase(tasksActions.fetch_tasks_request, state => ({
        ...state,
        loading: true
    }))
    builder.addCase(tasksActions.fetch_tasks_failed, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
        data: null,
    }))
    builder.addCase(tasksActions.fetch_tasks_success, (state, action) => ({
        ...state,
        loading: false,
        error: null,
        data: action.payload,
    }))
})