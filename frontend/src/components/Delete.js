import { useSelector, useDispatch } from 'react-redux'
import { removePost } from '../reducers/blogReducer'
import { setNotif } from '../reducers/notifReducer'
import PropTypes from 'prop-types'

const Delete = ({ blog }) => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const handleDel = async (event) => {
    event.preventDefault()

    if (!user || user.username !== blog.user.username) {
      return window.alert('You are not authorized to delete selected post')
    }
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )
    if (confirm === false) {
      console.log('Deletion cancelled')
      return
    }
    console.log(blog.id)
    dispatch(removePost(blog.id))
    dispatch(setNotif(`deleted ${blog.title}`, 5))
  }

  return (
    <>
      <button onClick={handleDel}>remove</button>
    </>
  )
}

Delete.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Delete
