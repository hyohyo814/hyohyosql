import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setCurrUser(state, action) {
      return action.payload
    }
  }
})

export const { setCurrUser, removeCurrUser } = userSlice.actions

export const login = (creds) => {
  return async (dispatch) => {
    const user = await loginService.login(creds)
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    dispatch(setCurrUser(user))
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.clear()
    dispatch(setCurrUser(null))
  }
}

export const initUser = () => {
  return (dispatch) => {
    const userJSON = window.localStorage.getItem('loggedUser')
    const user = JSON.parse(userJSON)
    if (!user) {
      return dispatch(setCurrUser(null))
    }
    dispatch(setCurrUser(user))
  }
}

export default userSlice.reducer