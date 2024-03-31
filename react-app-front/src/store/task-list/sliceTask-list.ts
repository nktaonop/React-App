import { createSlice } from '@reduxjs/toolkit'
import { Task } from '../../interfaces/taskList-interface'

interface TaskListState {
  data: Task[]
}

const initialState: TaskListState = {
  data: [],
}

const sliceTaskList = createSlice({
  name: 'taskList',
  initialState,
  reducers: {
    addTaskList: (state, action) => {
      state.data = action.payload
    },
  },
})

export const { addTaskList } = sliceTaskList.actions
export default sliceTaskList.reducer
