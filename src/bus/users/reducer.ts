// // Core
// import { createReducer } from '@reduxjs/toolkit';

// // Actions
// import { usersActions } from './actions';

// // Types
// import { UserProfileViewModel } from '@typings/swagger';

// interface InitialState {
//   data: { result: UserProfileViewModel[]  } | null;
//   loading: boolean;
//   error: null;
// }

// const initialState: InitialState = {
//   data: null,
//   loading: false,
//   error: null,
// }

// export const usersReducer = createReducer(initialState, (builder)  => {
//   builder.addCase(usersActions.fetchUsersRequest, (state) => ({
//     data: state.data,
//     loading: true,
//     error: null,
//   }));

//   builder.addCase(usersActions.fetchUsersSuccess, (_, action) => ({
//     data: action.payload,
//     loading: false,
//     error: null,
//   }));

//   builder.addCase(usersActions.fetchUsersFailure, (_, action) => ({
//     data: null,
//     loading: false,
//     error: action.payload
//   }));

//   builder.addCase(usersActions.deleteUser, (state, action) => {
//     if (state.data) {
//       state.data.result = state.data.result.filter(user => user.id !== action.payload);
//     }
//   })

//   builder.addCase(usersActions.updateUserSuccess, (state, action) => {
//     const { id, data: newUser } = action.payload;

//     if (state.data?.result) {
//       const oldUserIndex = state.data.result.findIndex(user => user.id === id)!;

//       state.data.result[oldUserIndex] = {...state.data.result[oldUserIndex], ...newUser};
//     }
//   })
// })
