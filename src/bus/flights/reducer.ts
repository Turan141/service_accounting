import { createReducer } from '@reduxjs/toolkit';
import { flightsActions } from './actions';

const InitialState = {
  data: {
    result: [],
    total: 0,
  },
  loading: false,
  error: null,
};

export const flightsReducer = createReducer(
  InitialState,
  (builder) => {
    builder.addCase(
      flightsActions.fetch_flights_request,
      (state) => ({
        ...state,
        loading: true,
        error: null,
      }),
    );

    builder.addCase(flightsActions.reset_flights, (state) => ({
      ...InitialState,
    }));

    builder.addCase(
      flightsActions.fetch_flights_failed,
      (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }),
    );

    // @ts-ignore
    builder.addCase(
      flightsActions.fetch_flights_success,
      (state, action) => {
        const newFlights = [
          ...state.data.result,
          ...action.payload.result,
        ];
        return {
          data: {
            result: newFlights,
            total: action.payload.total,
          },
          loading: false,
          error: null,
        };
      },
    );
  },
);
