import { RootState } from '@store/index';

export const getTenderOptions = (store: RootState) =>
  store.tenders.tenderOptions;

export const getTenders = (store: RootState) =>
  store.tenders.tenders.data;

export const getTendersLoading = (store: RootState) =>
  store.tenders.tenders.loading;

export const getTenderStatusHistory = (store: RootState) =>
  store.tenders.tenderStatusHistory;

export const getTenderEditLog = (store: RootState) =>
  store.tenders.tenderEditLog;
