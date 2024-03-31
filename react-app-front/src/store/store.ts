import { configureStore } from '@reduxjs/toolkit'
import sliceTaskList from './task-list/sliceTask-list'
import sliceHistory from './history/slice-history'
import sliceTaskHistory from './taskHistory/slice-taskHistory'

export const store = configureStore({
  reducer: {
    taskList: sliceTaskList,
    history: sliceHistory,
    taskHistory: sliceTaskHistory,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
