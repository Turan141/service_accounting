import { createAction } from "@reduxjs/toolkit";
import { types } from "./types";

export const reportsActions = {

    //Sync
    fetch_reports_request: createAction(types.FETCH_REPORTS_REQUEST),
    fetch_reports_failed: createAction(types.FETCH_REPORTS_FAILED, data => ({ payload: data })),
    fetch_reports_success: createAction(types.FETCH_REPORTS_SUCCESS, data => ({ payload: data })),

    //Async
    fetch_reports_async: createAction(types.FETCH_REPORTS_ASYNC, data => ({ payload: data })),
}