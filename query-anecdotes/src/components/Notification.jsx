import useNotification from "./useNotify"

const Notification = () => {
  const { msg } = useNotification();

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  if (msg === '') return null

  return <div data-testid="notification" style={style}>{msg}</div>
}

export default Notification
