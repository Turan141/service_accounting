import { takeEvery, all, call } from "@redux-saga/core/effects";
import { types } from "./types";
import { fetchReports } from "./workers";

function* watchFetchReports() {
    yield takeEvery(types.FETCH_REPORTS_ASYNC, fetchReports)
}

export function* watchReports() {
    yield all([
        call(watchFetchReports),
    ])
}
