import { takeEvery, all, call } from "@redux-saga/core/effects";
import { types } from "./types";
import { fetchTenderReports } from "./workers";

function* watchFetchTenderReports() {
    yield takeEvery(types.FETCH_TENDER_REPORTS_ASYNC, fetchTenderReports)
}

export function* watchTenderReports() {
    yield all([
        call(watchFetchTenderReports),
    ])
}
