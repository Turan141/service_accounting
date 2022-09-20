// Core
import { all, takeEvery, call } from 'redux-saga/effects';

// Types
import { tendersTypes } from './types';

// Workers
import {
  getServices,
  createTender,
  getTenders,
  editTenderStatus,
  getTenderStatusHistory,
  editTender,
  addTenderItems,
  signTender,
  confirmOrReject,
  completeFromDispatcher,
  getTenderEditLog,
} from './workers';

function* watchFetchServices() {
  yield takeEvery(tendersTypes.FETCH_SERVICES_ASYNC, getServices);
}

function* watchFetchTenders() {
  yield takeEvery(tendersTypes.FETCH_TENDERS_ASYNC, getTenders);
}

function* watchFetchTenderStatusHistory() {
  yield takeEvery(
    tendersTypes.FETCH_TENDER_STATUS_HISTORY_ASYNC,
    getTenderStatusHistory,
  );
}

function* watchFetchTenderEditLog() {
  yield takeEvery(
    tendersTypes.FETCH_TENDER_EDIT_LOG_ASYNC,
    getTenderEditLog,
  );
}

function* watchCreateTender() {
  yield takeEvery(tendersTypes.CREATE_TENDER_ASYNC, createTender);
}

function* watchEditTender() {
  yield takeEvery(tendersTypes.EDIT_TENDER_ASYNC, editTender);
}

function* watchCompleteFromDispatcher() {
  yield takeEvery(
    tendersTypes.COMPLETE_FROM_DISPATCHER,
    completeFromDispatcher,
  );
}

function* watchSignTender() {
  yield takeEvery(tendersTypes.SIGN_TENDER_ASYNC, signTender);
}

function* watchAddTenderItems() {
  yield takeEvery(
    tendersTypes.ADD_TENDER_ITEMS_ASYNC,
    addTenderItems,
  );
}

function* watchEditTenderStatus() {
  yield takeEvery(
    tendersTypes.EDIT_TENDER_STATUS_ASYNC,
    editTenderStatus,
  );
}

function* watchConfirmOrReject() {
  yield takeEvery(
    tendersTypes.CONFIRM_OR_REJECT_ASYNC,
    confirmOrReject,
  );
}

export function* watchTenders() {
  yield all([
    call(watchFetchServices),
    call(watchFetchTenders),
    call(watchCreateTender),
    call(watchEditTender),
    call(watchEditTenderStatus),
    call(watchFetchTenderStatusHistory),
    call(watchAddTenderItems),
    call(watchSignTender),
    call(watchConfirmOrReject),
    call(watchCompleteFromDispatcher),
    call(watchFetchTenderEditLog),
  ]);
}
