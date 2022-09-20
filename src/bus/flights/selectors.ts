import { RootState } from '@store/index';

export const getFlights = (store: RootState) => store.flights.data;
export const getFlightsError = (store: RootState) =>
  store.flights.error;
export const getFlightsLoading = (store: RootState) =>
  store.flights.loading;
