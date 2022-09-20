import { RootState } from "@store/index";

export const getReports = (store: RootState) => store.reports
export const getReportsError = (store: RootState) => store.reports.error
export const getReportsLoading = (store: RootState) => store.reports.loading