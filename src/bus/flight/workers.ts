import { put, call } from "@redux-saga/core/effects";
import { flightActions } from "./actions";
import flightsApi from "@api/flightsApi";

export function* fetchFlight(action: any) {
    yield put(flightActions.fetch_flight_request())

    const data = action.payload
    const { response, error } = yield call(flightsApi.asyncRequest, data)

    if (response)
        yield put(flightActions.fetch_flight_success(response.data))
    if (error)
        yield put(flightActions.fetch_flight_failed(error))
}