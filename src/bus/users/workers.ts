// // Core
// import { call, put, select } from 'redux-saga/effects';
// import { getFormValues } from 'redux-form';
// import { pick } from 'lodash'

// // Actions
// import { usersActions } from './actions';

// // Api
// import UsersApi from '@api/UsersApi';

// // Instruments
// import { ExternalUserFormId } from '@pages/AccountPage/Administration/components/Forms/ExternalUserForm';
// import { InternalUserFormId } from '@pages/AccountPage/Administration/components/Forms/InternalUserForm';
// import { toUTC } from '@bus/users/utils';

// // Types
// import { UserProfileViewModel, UserStatus } from '@typings/swagger';

// export function* fetchUsers(action: any) {
//   yield put(usersActions.fetchUsersRequest());

//   const filter = action.payload

//   const { response, error } = yield call(UsersApi.getUsers, filter);

//   if (response) {
//     yield put(usersActions.fetchUsersSuccess(response.data));
//   } else {
//     yield put(usersActions.fetchUsersFailure(error));
//   }
// }

// export function* fetchAdressBook(action: any) {
//   yield put(usersActions.fetchUsersRequest());

//   const filter = action.payload

//   const { response, error } = yield call(UsersApi.getAdressBook, filter);

//   if (response) {
//     yield put(usersActions.fetchUsersSuccess(response.data));
//   } else {
//     yield put(usersActions.fetchUsersFailure(error));
//   }
// }

// export function* fetchDocAdressBook(action: any) {
//   yield put(usersActions.fetchUsersRequest());

//   const filter = action.payload

//   const { response, error } = yield call(UsersApi.getDocAdressBook, filter);

//   if (response) {
//     yield put(usersActions.fetchUsersSuccess(response.data));
//   } else {
//     yield put(usersActions.fetchUsersFailure(error));
//   }
// }

// export function* deleteUser(action: any) {
//   const { id, reload, next } = action.payload;

//   const { response } = yield call(UsersApi.deleteUser, id);

//   if(response) {
//     reload && reload();

//     next && next()
//   }
// }

// export function* archiveUser(action: any) {
//   const { id, reload, next } = action.payload;

//   const { response } = yield call(UsersApi.archiveUser, id);

//   if(response) {
//     reload && reload();

//     next && next();
//   }
// }

// export function* blockUser(action: any) {
//   const { id, reload, next } = action.payload;

//   const { response } = yield call(UsersApi.blockUser, id);

//   if(response) {
//     reload && reload();

//     next && next();
//   }
// }

// export function* addUser(action: any) {
//   const data: UserProfileViewModel = yield select(state => getFormValues(ExternalUserFormId)(state));
//   const { next } = action.payload;
//   const { response } = yield call(UsersApi.createUser, { ...data, birthDate: toUTC(data.birthDate), status: UserStatus.InActivated });

//   if (response) {
//     next && next();
//   }
// }

// export function* addDraftUser(action: any) {
//   const data: UserProfileViewModel = yield select(state => getFormValues(ExternalUserFormId)(state));

//   const { next } = action.payload;

//   const { response } = yield call(UsersApi.createUser, { ...data, birthDate: toUTC(data.birthDate), status: UserStatus.Draft });

//   if (response) {
//     next && next();
//   }
// }

// export function* editUser(action: any) {
//   const { id, isExternal, next } = action.payload;

//   let data: Partial<UserProfileViewModel>;

//   if (isExternal) {
//     data = yield select(state => getFormValues(ExternalUserFormId)(state));
//   } else {
//     const formValues = yield select(state => getFormValues(InternalUserFormId)(state));
//     data = pick(formValues, ['footSize', 'height']);
//   }

//   const { response } = yield call(UsersApi.updateUser, id, data);

//   if (response) {
//     yield put(usersActions.updateUserSuccess({ id, data }));

//     next && next();
//   }
// }
