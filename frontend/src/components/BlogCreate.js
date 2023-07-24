import { useDispatch } from 'react-redux'
import { createPost } from '../reducers/blogReducer'
import { setNotif } from '../reducers/notifReducer'

const BlogCreate = () => {
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    const newObj = {
      title: event.target.Title.value,
      author: event.target.Author.value,
      url: event.target.Url.value,
    }
    console.log(newObj)
    dispatch(createPost(newObj))
    dispatch(setNotif(`${event.target.Title.value} by ${event.target.Author.value} added`, 5))
    event.target.Title.value = ''
    event.target.Author.value = ''
    event.target.Url.value = ''
  }

  return (
    <>
      <form onSubmit={addBlog}>
        <h2>create new</h2>
        <div>
          title:
          <input
            type="text"
            name="Title"
            id="titleinp"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="Author"
            id="authorinp"
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="Url"
            id="urlinp"
          />
        </div>
        <button
          type="submit"
          id="submitblog">
          create
        </button>
      </form>
    </>
  )
}

export default BlogCreate
