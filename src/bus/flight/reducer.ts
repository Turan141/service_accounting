import { createReducer } from "@reduxjs/toolkit";
import { flightActions } from "./actions";

const InitialState = {
    loading: false,
    error: null,
    data: null
}

export const flightReducer = createReducer(InitialState, (builder) => {
    builder.addCase(flightActions.fetch_flight_request, state => ({
        ...state,
        loading: true
    }))
    builder.addCase(flightActions.fetch_flight_failed, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
        data: null,
    }))
    builder.addCase(flightActions.fetch_flight_success, (state, action) => ({
        ...state,
        loading: false,
        error: null,
        data: action.payload,
    }))
})