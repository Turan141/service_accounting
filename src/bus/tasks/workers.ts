import { put, call } from "@redux-saga/core/effects";
import { tasksActions } from "./actions";
import tasksApi from "@api/flightsApi";

export function* fetchTasks(action: any) {
    yield put(tasksActions.fetch_tasks_request())

    const data = action.payload
    const { response, error } = yield call(tasksApi.asyncRequest, data)

    if (response)
        yield put(tasksActions.fetch_tasks_success(response.data))
    if (error)
        yield put(tasksActions.fetch_tasks_failed(error))
}