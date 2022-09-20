// Core
import { createReducer } from '@reduxjs/toolkit';

// Actions
import { tendersActions } from './actions';
import { DictionaryModel } from '@src/types/dictionaries';
import { DocumentView } from '@typings/swagger/api';

// Typings

interface InitialState {
  tenderOptions: {
    data: {
      result: DictionaryModel[];
      total: number;
    } | null;
    loading: boolean;
    error: string | null;
  };
  tenders: {
    data: {
      result: DocumentView[];
      total: number;
    };
    loading: boolean;
    error: null;
  };
  tenderStatusHistory: {
    data: {
      result: DictionaryModel[];
      total: number;
    } | null;
    loading: boolean;
    error: null;
  };
  tenderEditLog: {
    data: {
      result: DictionaryModel[];
      total: number;
    } | null;
    loading: boolean;
    error: null;
  };
}

const initialState: InitialState = {
  tenderOptions: {
    data: {
      result: [],
      total: 0,
    },
    loading: false,
    error: null,
  },
  tenders: {
    data: {
      result: [],
      total: 0,
    },
    loading: false,
    error: null,
  },
  tenderStatusHistory: {
    data: {
      result: [],
      total: 0,
    },
    loading: false,
    error: null,
  },
  tenderEditLog: {
    data: {
      result: [],
      total: 0,
    },
    loading: false,
    error: null,
  },
};

export const tendersReducer = createReducer(
  initialState,
  (builder) => {
    builder.addCase(tendersActions.fetchServicesRequest, (state) => ({
      ...state,
      tenders: state.tenders,
      tenderOptions: {
        ...state.tenderOptions,
        loading: true,
      },
      tenderStatusHistory: state.tenderStatusHistory,
    }));

    builder.addCase(
      tendersActions.fetchServicesSuccess,
      (state, action) => ({
        ...state,
        tenders: state.tenders,
        tenderOptions: {
          error: null,
          data: action.payload,
          loading: false,
        },
        tenderStatusHistory: state.tenderStatusHistory,
      }),
    );

    builder.addCase(
      tendersActions.fetchServicesFailure,
      (state, action) => ({
        ...state,
        tenders: state.tenders,
        tenderOptions: {
          error: action.payload,
          data: null,
          loading: false,
        },
        tenderStatusHistory: state.tenderStatusHistory,
      }),
    );

    builder.addCase(tendersActions.resetTendersTable, (state) => ({
      ...state,
      tenders: {
        ...initialState.tenders,
      },
      tenderOptions: state.tenderOptions,
      tenderStatusHistory: state.tenderStatusHistory,
    }));

    builder.addCase(tendersActions.fetchTendersRequest, (state) => ({
      ...state,
      tenders: {
        ...state.tenders,
        loading: true,
      },
      tenderOptions: state.tenderOptions,
      tenderStatusHistory: state.tenderStatusHistory,
    }));

    builder.addCase(
      tendersActions.fetchTendersSuccess,
      (state, action) => {
        const newTenders = [
          ...state.tenders.data.result,
          ...action.payload.result,
        ];
        const newTotal =
          action.payload.total + state.tenders.data.total;
        return {
          ...state,
          tenders: {
            data: {
              result: newTenders,
              total: newTotal,
            },
            loading: false,
            error: null,
          },
          tenderOptions: state.tenderOptions,
          tenderStatusHistory: state.tenderStatusHistory,
        };
      },
    );

    builder.addCase(
      tendersActions.updateOneTender,
      (state, action) => {
        const newTender = action.payload;
        const tenderIndex = state.tenders.data.result.findIndex(
          (tender) => tender.id === newTender.id,
        );
        const tenders = [...state.tenders.data.result];
        tenders[tenderIndex] = newTender;
        return {
          ...state,
          tenders: {
            data: {
              total: state.tenders.data.total,
              result: tenders,
            },
            loading: false,
            error: null,
          },
          tenderOptions: state.tenderOptions,
          tenderStatusHistory: state.tenderStatusHistory,
        };
      },
    );

    builder.addCase(
      tendersActions.fetchTendersFailure,
      (state, action) => ({
        ...state,
        tenders: {
          ...state.tenders,
          error: action.payload,
        },
        tenderOptions: state.tenderOptions,
        tenderStatusHistory: state.tenderStatusHistory,
      }),
    );

    //

    builder.addCase(
      tendersActions.fetchTenderStatusHistoryRequest,
      (state) => ({
        ...state,
        tenders: state.tenders,
        tenderOptions: state.tenderOptions,
        tenderStatusHistory: {
          ...state.tenderStatusHistory,
          data: {
            result: [],
            total: 0,
          },
          loading: true,
        },
      }),
    );

    builder.addCase(
      tendersActions.fetchTenderStatusHistorySuccess,
      (state, action) => ({
        ...state,
        tenders: state.tenders,
        tenderOptions: state.tenderOptions,
        tenderStatusHistory: {
          data: action.payload,
          loading: false,
          error: null,
        },
      }),
    );

    builder.addCase(
      tendersActions.fetchTenderStatusHistoryFailure,
      (state, action) => ({
        ...state,
        tenders: state.tenders,
        tenderOptions: state.tenderOptions,
        tenderStatusHistory: {
          data: null,
          loading: false,
          error: action.payload,
        },
      }),
    );

    builder.addCase(
      tendersActions.fetchTenderEditLogRequest,
      (state) => ({
        ...state,
        tenders: state.tenders,
        tenderOptions: state.tenderOptions,
        tenderEditLog: {
          ...state.tenderEditLog,
          loading: true,
        },
      }),
    );

    builder.addCase(
      tendersActions.fetchTenderEditLogSuccess,
      (state, action) => ({
        ...state,
        tenderEditLog: {
          data: action.payload,
          loading: false,
          error: null,
        },
      }),
    );

    builder.addCase(
      tendersActions.fetchTenderEditLogFailure,
      (state, action) => ({
        ...state,
        tenderEditLog: {
          ...state.tenderEditLog,
          error: action.payload,
        },
      }),
    );
  },
);
