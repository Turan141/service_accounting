import { createAction } from "@reduxjs/toolkit";
import { types } from "./types";

export const flightActions ={

    //Sync
    fetch_flight_request: createAction(types.FETCH_FLIGHT_REQUEST),
    fetch_flight_failed: createAction(types.FETCH_FLIGHT_FAILED, data => ({ payload: data })),
    fetch_flight_success: createAction(types.FETCH_FLIGHT_SUCCESS, data => ({ payload: data })),

    //Async
    fetch_flight_async: createAction(types.FETCH_FLIGHT_ASYNC, data => ({ payload: data })),
}