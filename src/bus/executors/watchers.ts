import { takeEvery, all, call } from "@redux-saga/core/effects";
import { types } from "./types";
import { fetchExecutors, addFlightExecutor } from "./workers";

function* watchFetchExecutors() {
    yield takeEvery(types.FETCH_EXECUTORS_ASYNC, fetchExecutors)
}

function* watchAddFlightExecutor() {
    yield takeEvery(types.ADD_FLIGHT_EXECUTOR_ASYNC, addFlightExecutor)
}

function* watchAddFlightTKO() {
    yield takeEvery(types.ADD_FLIGHT_EXECUTOR_ASYNC, addFlightExecutor)
}

export function* watchExecutors() {
    yield all([
        call(watchFetchExecutors),
        call(watchAddFlightExecutor),
        call(watchAddFlightTKO),
    ])
}
