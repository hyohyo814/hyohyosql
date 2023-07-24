import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import blogReducer from './reducers/blogReducer'
import notifReducer from './reducers/notifReducer'

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    blogs: blogReducer,
    notification: notifReducer,
  }
})
