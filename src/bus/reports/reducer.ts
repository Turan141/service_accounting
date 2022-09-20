import { createReducer } from "@reduxjs/toolkit";
import { reportsActions } from "./actions";

const InitialState = {
    loading: false,
    error: null,
    data: null
}

export const reportsReducer = createReducer(InitialState, (builder) => {
    builder.addCase(reportsActions.fetch_reports_request, state => ({
        ...state,
        loading: true
    }))
    builder.addCase(reportsActions.fetch_reports_failed, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
        data: null,
    }))
    builder.addCase(reportsActions.fetch_reports_success, (state, action) => ({
        ...state,
        loading: false,
        error: null,
        data: action.payload,
    }))
})