import { put, call } from "@redux-saga/core/effects";
import { reportsActions } from "./actions";
import reportsApi from "@api/reportsApi";

export function* fetchReports(action: any) {
    yield put(reportsActions.fetch_reports_request())

    const data = action.payload
    const { response, error } = yield call(reportsApi.asyncRequest, data)

    if (response)
        yield put(reportsActions.fetch_reports_success(response.data))
    if (error)
        yield put(reportsActions.fetch_reports_failed(error))
}