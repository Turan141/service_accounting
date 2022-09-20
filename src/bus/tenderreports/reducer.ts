import { createReducer } from '@reduxjs/toolkit';
import { DictionaryModel } from '@src/types/dictionaries';
import { tenderReportsActions } from './actions';

const InitialState: any = {
  loading: false,
  error: null,
  data: null
}

// tenders: state.tenders,
//     tenderOptions: {
//       error: action.payload,
//       data: null,
//       loading: false,
//     },
//     tenderStatusHistory: state.tenderStatusHistory,

export const tenderReportsReducer = createReducer(
  InitialState,
  (builder) => {
    builder.addCase(tenderReportsActions.fetch_tender_reports_request, state => ({
      ...state,
      loading: true
  }))
  builder.addCase(tenderReportsActions.fetch_tender_reports_failed, (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
      data: null,
  }))
  builder.addCase(tenderReportsActions.fetch_tender_reports_success, (state, action) => ({
      ...state,
      loading: false,
      error: null,
      data: action.payload,
  }))
  },
);
