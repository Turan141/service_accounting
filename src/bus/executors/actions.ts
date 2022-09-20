import { createAction } from "@reduxjs/toolkit";
import { types } from "./types";

export const executorsActions ={

    //Sync
    fetch_executors_request: createAction(types.FETCH_EXECUTORS_REQUEST),
    fetch_executors_failed: createAction(types.FETCH_EXECUTORS_FAILED, data => ({ payload: data })),
    fetch_executors_success: createAction(types.FETCH_EXECUTORS_SUCCESS, data => ({ payload: data })),

    //Async
    fetch_executors_async: createAction(types.FETCH_EXECUTORS_ASYNC, data => ({ payload: data })),
    add_flight_executor_async: createAction(types.ADD_FLIGHT_EXECUTOR_ASYNC, data => ({ payload: data })),
    add_flight_tko_async: createAction(types.ADD_FLIGHT_TKO_ASYNC, data => ({ payload: data })),
}