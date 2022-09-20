import { takeEvery, all, call } from '@redux-saga/core/effects';
import { types } from './types';
import { fetchWhatever, getFlights } from './workers';

function* watchFetchWhatever() {
  // yield takeEvery(types.FETCH_FLIGHTS_ASYNC, fetchWhatever);
}

function* watchFetchFlights() {
  yield takeEvery(types.FETCH_FLIGHTS_ASYNC, getFlights);
}

export function* watchFlights() {
  yield all([call(watchFetchFlights), call(watchFetchWhatever)]);
}
