import { createAction } from '@reduxjs/toolkit';
import { types } from './types';

export const flightsActions = {
  //Sync
  reset_flights: createAction(types.RESET_FLIGHTS),
  fetch_flights_request: createAction(types.FETCH_FLIGHTS_REQUEST),
  fetch_flights_failed: createAction(
    types.FETCH_FLIGHTS_FAILED,
    (data) => ({ payload: data }),
  ),
  fetch_flights_success: createAction(
    types.FETCH_FLIGHTS_SUCCESS,
    (data) => ({ payload: data }),
  ),

  //Async
  fetch_flights_async: createAction(
    types.FETCH_FLIGHTS_ASYNC,
    (data) => ({ payload: data }),
  ),
};
