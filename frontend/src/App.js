import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Notification from './components/Notification'
import Menu from './components/Display/Menu'
import Users from './components/Display/Users'
import Blogs from './components/Display/Blogs'
import { initUser } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'
import { initBlogs } from './reducers/blogReducer'
import './index.css'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUsers())
    dispatch(initBlogs())
    dispatch(initUser())
  }, [dispatch])

  return (
    <div>
      <Menu />
      <Notification />
      <Routes>
        <Route
          path="/blogs/*"
          element={<Blogs />}
        />
        <Route
          path="/users/*"
          element={<Users />}
        />
      </Routes>
    </div>
  )
}

export default App
