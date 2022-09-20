import { createReducer } from "@reduxjs/toolkit";
import { servicesActions } from "./actions";

const InitialState = {
    loading: false,
    error: null,
    data: null
}

export const servicesReducer = createReducer(InitialState, (builder) => {
    builder.addCase(servicesActions.fetch_services_request, state => ({
        ...state,
        loading: true
    }))
    builder.addCase(servicesActions.fetch_services_failed, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
        data: null,
    }))
    builder.addCase(servicesActions.fetch_services_success, (state, action) => ({
        ...state,
        loading: false,
        error: null,
        data: action.payload,
    }))
})