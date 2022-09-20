import { createAction } from "@reduxjs/toolkit";
import { types } from "./types";

export const servicesActions = {

    //Sync
    fetch_services_request: createAction(types.FETCH_SERVICES_REQUEST),
    fetch_services_failed: createAction(types.FETCH_SERVICES_FAILED, data => ({ payload: data })),
    fetch_services_success: createAction(types.FETCH_SERVICES_SUCCESS, data => ({ payload: data })),

    //Async
    fetch_services_async: createAction(types.FETCH_SERVICES_ASYNC, data => ({ payload: data })),
}