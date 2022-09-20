// Core
import { put, call } from 'redux-saga/effects';

// Actions
import { attachmentsActions } from './actions';

// Api
import AttachmentApi from '@api/attachmentApi';

export function* getAttachment(action: any) {
  yield put(attachmentsActions.fetchAttachmentRequest());

  const { documentId, documentItemId } = action.payload;

  const { data, error } = yield call(
    AttachmentApi.getTAttachment,
    documentId,
    documentItemId,
  );

  if (data) {
    yield put(
      attachmentsActions.fetchAttachmentSuccess({ result: data, total: 0 }),
    );
  } else {
    yield put(attachmentsActions.fetchAttachmentFailure(error));
  }
}
