import { takeEvery, all, call } from "@redux-saga/core/effects";
import { types } from "./types";
import { fetchTasks } from "./workers";

function* watchFetchTasks() {
    yield takeEvery(types.FETCH_TASKS_ASYNC, fetchTasks)
}

export function* watchTasks() {
    yield all([
        call(watchFetchTasks),
    ])
}
