import { useSelector, useDispatch } from 'react-redux'
import { Link, Routes, Route, useMatch } from 'react-router-dom'
import BlogCreate from '../BlogCreate'
import Togglable from '../Togglable'
import Delete from '../Delete'
import { updLikes, addComment } from '../../reducers/blogReducer'

const BlogInfo = ({ obj }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  if (!obj) {
    return <div>empty</div>
  }

  const handleLikes = async (event) => {
    event.preventDefault()

    const newBlogObj = {
      ...obj,
      likes: obj.likes + 1,
    }

    dispatch(updLikes(newBlogObj, obj.id))
  }

  const comments = !obj ? (
    <div>no comments yet</div>
  ) : (
    obj.comments.map((v) => <li key={v}>{v}</li>)
  )

  const deleteFn = !user ? (
    null
  ) : (
    user !== undefined && user.username === obj.user.username ? (
      <Delete blog={obj} />
    ) : (
      null
    )
  )

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(addComment(event.target.Comment.value, obj.id))
    event.target.Comment.value = ''
  }

  console.log(obj)

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
      <p>added by {obj.user.name}</p>
      <div>
        {deleteFn}
      </div>
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input
          type="text"
          name="Comment"
        />
        <button type="submit">add comment</button>
      </form>
      <ul>{comments}</ul>
    </div>
  )
}

const BlogList = ({ obj }) => {
  return <div>{obj}</div>
}

const Blogs = () => {
  const bloglist = {
    display: 'block',
    marginTop: '8px',
    padding: '10px 0px 1px 4px',
    outline: '1px solid',
  }

  const blogs = useSelector((state) => state.blogs)
  console.log(blogs)
  const titles = blogs.map((v) => (
    <div
      key={v.id}
      style={bloglist}>
      <Link to={`/blogs/${v.id}`}>{v.title}</Link>
    </div>
  ))

  const matchBlog = useMatch('/blogs/:id')
  const blog = matchBlog
    ? blogs.find((v) => v.id === matchBlog.params.id)
    : 'blog not found'

  return (
    <div>
      <h1>blog app</h1>
      <Togglable buttonLabel="create new">
        <BlogCreate />
      </Togglable>
      <div>
        <Routes>
          <Route
            path="/"
            element={<BlogList obj={titles} />}
          />
          <Route
            path="/:id"
            element={<BlogInfo obj={blog} />}
          />
        </Routes>
      </div>
    </div>
  )
}

export default Blogs
