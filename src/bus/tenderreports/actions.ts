import { createAction } from "@reduxjs/toolkit";
import { types } from "./types";

export const tenderReportsActions = {

    //Sync
    fetch_tender_reports_request: createAction(types.FETCH_TENDER_REPORTS_REQUEST),
    fetch_tender_reports_failed: createAction(types.FETCH_TENDER_REPORTS_FAILED, data => ({ payload: data })),
    fetch_tender_reports_success: createAction(types.FETCH_TENDER_REPORTS_SUCCESS, data => ({ payload: data })),

    //Async
    fetch_tender_reports_async: createAction(types.FETCH_TENDER_REPORTS_ASYNC, data => ({ payload: data })),
}