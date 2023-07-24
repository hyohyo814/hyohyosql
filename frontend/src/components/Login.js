import { useDispatch } from 'react-redux'
import { setNotif } from '../reducers/notifReducer'
import { login } from '../reducers/userReducer'

const Login = () => {
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    const creds = {
      username: event.target.Username.value,
      password: event.target.Password.value,
    }
    dispatch(login(creds))
    dispatch(setNotif(`successfully logged in as ${event.target.Username.value}`, 5))
    event.target.Username.value = ''
    event.target.Password.value = ''
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          name="Username"
          id="username"
        />
      </div>
      <div>
        password
        <input
          type="text"
          name="Password"
          id="password"
        />
      </div>
      <button
        id="loginbtn"
        type="submit">
        login
      </button>
    </form>
  )
}

export default Login
