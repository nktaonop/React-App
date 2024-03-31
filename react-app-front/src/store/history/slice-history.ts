import { createSlice } from '@reduxjs/toolkit'
import { HistoryInterface } from '../../interfaces/history-interface'

interface HistoryState {
  data: HistoryInterface[]
}

const initialState: HistoryState = {
  data: [],
}

const sliceHistory = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addAction: (state, action) => {
      state.data = action.payload
    },
  },
})

export const { addAction } = sliceHistory.actions
export default sliceHistory.reducer
