import { takeEvery, all, call } from "@redux-saga/core/effects";
import { types } from "./types";
import { fetchFlight } from "./workers";

function* watchFetchFlight() {
    yield takeEvery(types.FETCH_FLIGHT_ASYNC, fetchFlight)
}

export function* watchFlight() {
    yield all([
        call(watchFetchFlight),
    ])
}
