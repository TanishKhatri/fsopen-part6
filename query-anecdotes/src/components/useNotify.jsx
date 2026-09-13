import { useContext } from "react";
import NotificationContext from "./NotificationProvider";

const useNotify = () => useContext(NotificationContext);

export default useNotify;