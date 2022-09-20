// Core
import { createReducer } from '@reduxjs/toolkit';

// Actions
import { attachmentsActions } from './actions';

interface InitialState {
  tenderSignature: {
    data: {
      result: {
        url: string | null;
      };
      total: number;
    } | null;
    loading: boolean;
    error: string | null;
  };
}

const initialState: InitialState = {
  tenderSignature: {
    data: {
      result: {
        url: null,
      },
      total: 0,
    },
    loading: false,
    error: null,
  },
};

export const attachmentsReducer = createReducer(initialState, (builder) => {
  builder.addCase(attachmentsActions.fetchAttachmentRequest, (state) => ({
    tenderSignature: {
      ...state.tenderSignature,
      loading: true,
    },
  }));

  builder.addCase(
    attachmentsActions.fetchAttachmentSuccess,
    (state, action) => ({
      tenderSignature: {
        error: null,
        data: action.payload,
        loading: false,
      },
    }),
  );

  builder.addCase(
    attachmentsActions.fetchAttachmentFailure,
    (state, action) => ({
      tenderSignature: {
        error: action.payload,
        data: null,
        loading: false,
      },
    }),
  );
});
