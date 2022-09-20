// Core
import { createAction } from '@reduxjs/toolkit';

// Types
import { attachmentsTypes } from '@bus/attachment/types';

export const attachmentsActions = {
  fetchAttachmentRequest: createAction(
    attachmentsTypes.FETCH_ATTACHMENT_REQUEST,
  ),

  fetchAttachmentSuccess: createAction(
    attachmentsTypes.FETCH_ATTACHMENT_SUCCESS,
    (data) => ({ payload: data }),
  ),

  fetchAttachmentFailure: createAction(
    attachmentsTypes.FETCH_ATTACHMENT_FAILURE,
    (error) => ({ payload: error }),
  ),

  fetchAttachmentAsync: createAction(
    attachmentsTypes.FETCH_ATTACHMENT_ASYNC,
    (data) => ({
      payload: data,
    }),
  ),
};
