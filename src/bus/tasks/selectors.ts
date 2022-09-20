import { RootState } from "@store/index";

export const getTasks = (store: RootState) => store.tasks
export const getTasksError = (store: RootState) => store.tasks.error
export const getTasksLoading = (store: RootState) => store.tasks.loading