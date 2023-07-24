import { createSlice } from '@reduxjs/toolkit'

const initState = {
  message: '',
  display: 'none',
}

const notifSlice = createSlice({
  name: 'notify',
  initialState: initState,
  reducers: {
    notifDisp(state, action) {
      return {
        message: action.payload,
        display: 'block'
      }
    },
    notifClear(state, action) {
      return initState
    }
  }
})

export const { notifDisp, notifClear } = notifSlice.actions

export const setNotif = (message, time) => {
  return (dispatch) => {
    dispatch(notifDisp(message))
    setTimeout(() => {
      dispatch(notifClear())
    }, time*1000)
  }
}

export default notifSlice.reducer