import { put, call } from "@redux-saga/core/effects";
import { executorsActions } from "./actions";
import executorsApi from "@src/api/executorsApi";

export function* fetchExecutors(action: any) {
    yield put(executorsActions.fetch_executors_request())

    const data = action.payload
    const { response, error } = yield call(executorsApi.asyncRequest, data)

    if (response)
        yield put(executorsActions.fetch_executors_success(response.data))
    if (error)
        yield put(executorsActions.fetch_executors_failed(error))
}

export function* addFlightExecutor(action: any) {

    const data = action.payload
    const { response, error } = yield call(executorsApi.asyncRequest, data)

    if (response)
        console.log(response)
    if (error)
        console.log(error)
}

export function* addFlightTKO(action: any) {

    const data = action.payload
    const { response, error } = yield call(executorsApi.asyncRequest, data)

    if (response)
        console.log(response)
    if (error)
        console.log(error)
}