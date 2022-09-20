// Core
import { all, takeEvery, call } from 'redux-saga/effects';

// Types
import { attachmentsTypes } from './types';
import { getAttachment } from '@bus/attachment/workers';

function* watchFetchSignature() {
  yield takeEvery(attachmentsTypes.FETCH_ATTACHMENT_ASYNC, getAttachment);
}

export function* watchAttachments() {
  yield all([call(watchFetchSignature)]);
}
