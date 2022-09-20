import { put, call } from "@redux-saga/core/effects";
import { servicesActions } from "./actions";
import servicesApi from "@api/servicesApi";

export function* fetchServices(action: any) {
    yield put(servicesActions.fetch_services_request())

    const data = action.payload
    const { response, error } = yield call(servicesApi.asyncRequest, data)

    if (response)
        yield put(servicesActions.fetch_services_success(response.data.result.items))
    if (error)
        yield put(servicesActions.fetch_services_failed(error))
}