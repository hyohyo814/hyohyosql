import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../reducers/userReducer'
import { setNotif } from '../../reducers/notifReducer'
import Togglable from '../Togglable'
import Login from '../Login'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const menutxt = {
    margin: '0 2px',
  }

  const menu = {
    color: 'black',
    display: 'flex',
    backgroundColor: 'GainsBoro',
    padding: '5px'
  }

  const handleLogout = () => {
    dispatch(logout())
    dispatch(setNotif('Succesfully logged out', 5))
  }

  const loggedIn = () => {
    return (
      <>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </>
    )
  }

  const loggedOut = () => (
    <Togglable buttonLabel="login">
      <Login />
    </Togglable>
  )

  return (
    <div
      className="menu"
      style={menu}>
      <Link
        to="/blogs"
        style={menutxt}>
        blogs
      </Link>
      <Link
        to="/users"
        style={menutxt}>
        users
      </Link>
      {user === null ? loggedOut() : loggedIn()}
    </div>
  )
}

export default Menu
