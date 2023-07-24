import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    display: notification.display,
  }

  if (notification.message === null) {
    return null
  }

  return <div style={style}>{notification.message}</div>
}

export default Notification