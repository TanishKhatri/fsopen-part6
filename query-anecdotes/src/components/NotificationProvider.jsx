import { useState, createContext  } from "react";

const NotificationContext = createContext();

export default NotificationContext;

export const NotificationContextProvider = ({ children }) => {
  const [msg, setMsg] = useState("");

  const showMsg = (message) => {
    setMsg(message);
    setTimeout(() => {
      setMsg('');
    }, 5000)
  };

  return (
    <NotificationContext.Provider value={{msg, showMsg}}>
      {children}
    </NotificationContext.Provider>
  )
}