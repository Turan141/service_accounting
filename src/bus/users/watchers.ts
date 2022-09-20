// // Core
// import { all, takeEvery, call } from 'redux-saga/effects';

// // Types
// import { usersTypes } from './types';

// // Workers
// import {
//   addDraftUser,
//   addUser,
//   archiveUser,
//   deleteUser,
//   editUser, fetchAdressBook, fetchDocAdressBook,
//   fetchUsers,
// } from './workers';

// function* watchFetchUsers() {
//   yield takeEvery(usersTypes.FETCH_USERS_ASYNC, fetchUsers);
// }

// function* watchFetchAdressBook() {
//   yield takeEvery(usersTypes.FETCH_ADRESS_BOOK_ASYNC, fetchAdressBook);
// }
// function* watchFetchDocAdressBook() {
//   yield takeEvery(usersTypes.FETCH_DOC_ADRESS_BOOK_ASYNC, fetchDocAdressBook);
// }
// function* watchDeleteUser() {
//   yield takeEvery(usersTypes.DELETE_USER_ASYNC, deleteUser);
// }

// function* watchArchiveUser() {
//   yield takeEvery(usersTypes.ARCHIVE_USER_ASYNC, archiveUser);
// }

// function* watchBlockUser() {
//   yield takeEvery(usersTypes.BLOCK_USER_ASYNC, archiveUser);
// }

// function* watchAddUser() {
//   yield takeEvery(usersTypes.ADD_USER_ASYNC, addUser);
// }

// function* watchAddDraftUser() {
//   yield takeEvery(usersTypes.ADD_DRAFT_USER_ASYNC, addDraftUser);
// }

// function* watchUpdateUser() {
//   yield takeEvery(usersTypes.UPDATE_USER_ASYNC, editUser);
// }

// export function* watchUsers() {
//   yield all([
//     call(watchFetchUsers),
//     call(watchFetchAdressBook),
//     call(watchDeleteUser),
//     call(watchArchiveUser),
//     call(watchAddUser),
//     call(watchAddDraftUser),
//     call(watchUpdateUser),
//     call(watchBlockUser),
//     call(watchFetchDocAdressBook)
//   ]);
// }
