import { put, call } from '@redux-saga/core/effects';
import { flightsActions } from './actions';
import flightsApi from '@api/flightsApi';

export function* fetchWhatever(action: any) {
  yield put(flightsActions.fetch_flights_request());

  const data = action.payload;
  const { response, error } = yield call(
    flightsApi.asyncRequest,
    data,
  );

  if (response)
    yield put(flightsActions.fetch_flights_success(response.data));
  if (error) yield put(flightsActions.fetch_flights_failed(error));
}

export function* getFlights(action: any) {
  yield put(flightsActions.fetch_flights_request());
  console.log(action.payload);
  const data = action.payload;
  const { result, total, error } = yield call(
    flightsApi.getFlights,
    data,
  );

  if (!error) {
    yield put(
      flightsActions.fetch_flights_success({ result, total }),
    );
  }
  if (error) yield put(flightsActions.fetch_flights_failed(error));
}
