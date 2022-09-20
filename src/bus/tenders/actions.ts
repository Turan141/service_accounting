// Core
import { createAction } from '@reduxjs/toolkit';

// Types
import { tendersTypes } from './types';

export const tendersActions = {
  // Sync
  fetchServicesRequest: createAction(
    tendersTypes.FETCH_SERVICES_REQUEST,
  ),

  resetTendersTable: createAction(tendersTypes.RESET_TENDERS_TABLE),

  fetchServicesSuccess: createAction(
    tendersTypes.FETCH_SERVICES_SUCCESS,
    (data) => ({ payload: data }),
  ),

  fetchServicesFailure: createAction(
    tendersTypes.FETCH_SERVICES_FAILURE,
    (error) => ({ payload: error }),
  ),

  fetchTendersRequest: createAction(
    tendersTypes.FETCH_TENDERS_REQUEST,
  ),

  fetchTendersSuccess: createAction(
    tendersTypes.FETCH_TENDERS_SUCCESS,
    (data) => ({ payload: data }),
  ),

  fetchTendersFailure: createAction(
    tendersTypes.FETCH_TENDERS_FAILURE,
    (error) => ({ payload: error }),
  ),

  fetchTenderStatusHistoryRequest: createAction(
    tendersTypes.FETCH_TENDER_STATUS_HISTORY_REQUEST,
  ),

  fetchTenderStatusHistorySuccess: createAction(
    tendersTypes.FETCH_TENDER_STATUS_HISTORY_SUCCESS,
    (data) => ({ payload: data }),
  ),

  fetchTenderStatusHistoryFailure: createAction(
    tendersTypes.FETCH_TENDER_STATUS_HISTORY_FAILURE,
    (error) => ({ payload: error }),
  ),

  fetchTenderEditLogRequest: createAction(
    tendersTypes.FETCH_TENDER_EDIT_LOG_REQUEST,
  ),

  fetchTenderEditLogSuccess: createAction(
    tendersTypes.FETCH_TENDER_EDIT_LOG_SUCCESS,
    (data) => ({ payload: data }),
  ),

  fetchTenderEditLogFailure: createAction(
    tendersTypes.FETCH_TENDER_EDIT_LOG_FAILURE,
    (error) => ({ payload: error }),
  ),

  // Async
  fetchServicesAsync: createAction(
    tendersTypes.FETCH_SERVICES_ASYNC,
    (data) => ({ payload: data }),
  ),

  fetchTendersAsync: createAction(
    tendersTypes.FETCH_TENDERS_ASYNC,
    (data) => ({
      payload: data,
    }),
  ),

  addTenderItems: createAction(
    tendersTypes.ADD_TENDER_ITEMS_ASYNC,
    (data) => ({
      payload: data,
    }),
  ),

  signTender: createAction(
    tendersTypes.SIGN_TENDER_ASYNC,
    (data) => ({
      payload: data,
    }),
  ),

  updateOneTender: createAction(
    tendersTypes.UPDATE_ONE_TENDER,
    (data) => ({
      payload: data,
    }),
  ),

  createTenderAsync: createAction(
    tendersTypes.CREATE_TENDER_ASYNC,
    (data) => ({
      payload: data,
    }),
  ),

  editTendersRecordAsync: createAction(
    tendersTypes.EDIT_TENDER_ASYNC,
    (data) => ({ payload: data }),
  ),

  editTenderStatusAsync: createAction(
    tendersTypes.EDIT_TENDER_STATUS_ASYNC,
    (data) => ({ payload: data }),
  ),

  completeFromDispatcher: createAction(
    tendersTypes.COMPLETE_FROM_DISPATCHER,
    (data) => ({ payload: data }),
  ),

  deleteTendersRecordAsync: createAction(
    tendersTypes.DELETE_TENDER_ASYNC,
    (data) => ({ payload: data }),
  ),

  fetchTenderStatusHistoryRecordAsync: createAction(
    tendersTypes.FETCH_TENDER_STATUS_HISTORY_ASYNC,
    (data) => ({ payload: data }),
  ),

  fetchTenderEditLogRecordAsync: createAction(
    tendersTypes.FETCH_TENDER_EDIT_LOG_ASYNC,
    (data) => ({ payload: data }),
  ),

  confirmOrRejectAsync: createAction(
    tendersTypes.CONFIRM_OR_REJECT_ASYNC,
    (data) => ({ payload: data }),
  ),
};
