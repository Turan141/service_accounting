import { createReducer } from "@reduxjs/toolkit";
import { executorsActions } from "./actions";

const InitialState = {
    loading: false,
    error: null,
    data: null
}

export const executorsReducer = createReducer(InitialState, (builder) => {
    builder.addCase(executorsActions.fetch_executors_request, state => ({
        ...state,
        loading: true
    }))
    builder.addCase(executorsActions.fetch_executors_failed, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
        data: null,
    }))
    builder.addCase(executorsActions.fetch_executors_success, (state, action) => ({
        ...state,
        loading: false,
        error: null,
        data: action.payload,
    }))
})