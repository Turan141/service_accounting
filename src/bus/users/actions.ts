// Core
import { createAction } from '@reduxjs/toolkit';

// Types
import { usersTypes } from './types';

export const usersActions = {
  // Sync
  fetchUsersRequest: createAction(usersTypes.FETCH_USERS_REQUEST),

  fetchUsersSuccess: createAction(
    usersTypes.FETCH_USERS_SUCCESS,
    (data) => ({ payload: data }),
  ),

  fetchUsersFailure: createAction(
    usersTypes.FETCH_USERS_FAILURE,
    (error) => ({ payload: error }),
  ),

  deleteUser: createAction(
    usersTypes.DELETE_USER,
    data => ({ payload: data })
  ),

  updateUserSuccess: createAction(
    usersTypes.UPDATE_USER_SUCCESS,
    data => ({ payload: data })
  ),

  // Async
  fetchUsersAsync: createAction(
    usersTypes.FETCH_USERS_ASYNC,
    filter => ({ payload: filter })
  ),

  fetchAdressBookAsync: createAction(
    usersTypes.FETCH_ADRESS_BOOK_ASYNC,
    filter => ({ payload: filter })
  ),

  fetchDocAdressBookAsync: createAction(
    usersTypes.FETCH_DOC_ADRESS_BOOK_ASYNC,
    filter => ({ payload: filter })
  ),

  deleteUserAsync: createAction(
    usersTypes.DELETE_USER_ASYNC,
    (data) => ({ payload: data })
  ),

  archiveUserAsync: createAction(
    usersTypes.ARCHIVE_USER_ASYNC,
    (data) => ({ payload: data }),
  ),

  blockUserAsync: createAction(
    usersTypes.BLOCK_USER_ASYNC,
    data => ({ payload: data }),
  ),

  addUserAsync: createAction(
    usersTypes.ADD_USER_ASYNC,
    (data) => ({ payload: data }),
  ),

  addDraftUserAsync: createAction(
    usersTypes.ADD_DRAFT_USER_ASYNC,
    (data) => ({ payload: data }),
  ),

  updateUserAsync: createAction(
    usersTypes.UPDATE_USER_ASYNC,
    (data) => ({ payload: data }),
  ),
}
