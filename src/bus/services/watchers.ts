import { takeEvery, all, call } from "@redux-saga/core/effects";
import { types } from "./types";
import { fetchServices } from "./workers";

function* watchFetchServices() {
    yield takeEvery(types.FETCH_SERVICES_ASYNC, fetchServices)
}

export function* watchServices() {
    yield all([
        call(watchFetchServices),
    ])
}
