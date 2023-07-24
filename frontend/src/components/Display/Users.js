import { useSelector, useDispatch } from 'react-redux'
import { Link, Routes, Route, useMatch } from 'react-router-dom'
import { updLikes } from '../../reducers/blogReducer'

const UsersList = ({ obj }) => (
  <table>
    <tbody>
      <tr>
        <th></th>
        <th>
          <b>blogs created</b>
        </th>
      </tr>
      <tr>
        <td>{obj.users}</td>
        <td>{obj.blogs}</td>
      </tr>
    </tbody>
  </table>
)

const UserInfo = ({ obj }) => {
  return (
    <div>
      <h2>{obj.name}</h2>
      <h3>added blogs</h3>
      <ul>{obj.blogs}</ul>
    </div>
  )
}

const BlogInfo = ({ obj }) => {
  const dispatch = useDispatch()
  const handleLikes = async (event) => {
    event.preventDefault()

    const newBlogObj = {
      ...obj,
      likes: obj.likes + 1,
    }

    dispatch(updLikes(newBlogObj, obj.id))
  }

  return (
    <div>
      <h2>{obj.title}</h2>
      <a>{obj.url}</a>
      <div className="likesdisplay">
        likes: {obj.likes}
        <button
          onClick={handleLikes}
          placeholder={'likebtn'}>
          like
        </button>
      </div>
      <p>added by {obj.name}</p>
    </div>
  )
}

const Users = () => {
  const users = useSelector((state) => state.users)
  const blogsColl = useSelector((state) => state.blogs)

  const usersList = users.map((user) => {
    return (
      <div key={user.id}>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </div>
    )
  })

  const usersBlogs = users.map((user) => {
    return <div key={user.id}>{user.blogs.length}</div>
  })

  const userColl = {
    users: usersList,
    blogs: usersBlogs,
  }

  const matchUser = useMatch('/users/:id')
  const user = matchUser
    ? users.find((v) => v.id === matchUser.params.id)
    : null

  const name = user ? user.name : 'user not found'

  const blogs =
    user && user.blogs.length > 0
      ? user.blogs.map((v) => (
        <li key={v.id}>
          <Link to={`/blogs/${v.id}`}>{v.title}</Link>
        </li>
      ))
      : 'This user has not added any blogs yet'

  const userInfo = {
    name: name,
    blogs: blogs,
  }

  const matchBlog = useMatch('/blogs/:id')
  const blog = matchBlog
    ? blogsColl.find((v) => v.id === matchBlog.params.id)
    : 'blog not found'

  return (
    <div>
      <h1>Users</h1>
      <Routes>
        <Route
          path="/"
          element={<UsersList obj={userColl} />}
        />
        <Route
          path="/:id"
          element={<UserInfo obj={userInfo} />}
        />
        <Route
          path="/blogs/:id"
          element={<BlogInfo obj={blog} />}
        />
      </Routes>
    </div>
  )
}

export default Users
