import { createSlice } from '@reduxjs/toolkit'
import { HistoryInterface } from '../../interfaces/history-interface'

interface HistoryState {
  data: HistoryInterface[]
}

const initialState: HistoryState = {
  data: [],
}

const sliceTaskHistory = createSlice({
  name: 'taskHistory',
  initialState,
  reducers: {
    addAction: (state, action) => {
      state.data = action.payload
    },
  },
})

export const { addAction } = sliceTaskHistory.actions
export default sliceTaskHistory.reducer
