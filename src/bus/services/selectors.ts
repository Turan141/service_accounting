import { RootState } from "@store/index";

export const getServices = (store: RootState) => store.services
export const getServicesError = (store: RootState) => store.services.error
export const getServicesLoading = (store: RootState) => store.services.loading