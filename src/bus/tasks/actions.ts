import { createAction } from "@reduxjs/toolkit";
import { types } from "./types";

export const tasksActions ={

    //Sync
    fetch_tasks_request: createAction(types.FETCH_TASKS_REQUEST),
    fetch_tasks_failed: createAction(types.FETCH_TASKS_FAILED, data => ({ payload: data })),
    fetch_tasks_success: createAction(types.FETCH_TASKS_SUCCESS, data => ({ payload: data })),

    //Async
    fetch_tasks_async: createAction(types.FETCH_TASKS_ASYNC, data => ({ payload: data })),
}