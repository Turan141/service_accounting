import { RootState } from "@store/index";

export const getExecutors = (store: RootState) => store.executors
export const getExecutorsError = (store: RootState) => store.executors.error
export const getExecutorsLoading = (store: RootState) => store.executors.loading