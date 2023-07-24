import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Togglable from './Togglable'
import Login from './Login'
import BlogCreate from './BlogCreate'
import { logout } from '../reducers/userReducer'
import { setNotif } from '../reducers/notifReducer'


const DispSelector = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const user = useSelector(state => state.user)

  const handleLogout = () => {
    dispatch(logout())
    dispatch(setNotif('Successfully logged out', 5))
  }

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <Login />
    </Togglable>
  )

  const blogForm = () => (
    <>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
      <Togglable
        buttonLabel="new blog"
        ref={blogFormRef}>
        <BlogCreate />
      </Togglable>
    </>
  )

  return <div>{user === null ? loginForm() : blogForm()}</div>
}

export default DispSelector