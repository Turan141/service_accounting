import { RootState } from "@store/index";

export const getFlight = (store: RootState) => store.flight
export const getFlightError = (store: RootState) => store.flight.error
export const getFlightLoading = (store: RootState) => store.flight.loading