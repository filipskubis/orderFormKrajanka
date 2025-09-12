import { AlertContext } from "./AlertContext";
import { useState, useRef } from "react";

const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const timeoutsRef = useRef({});

  function addAlert(type, message) {
    const id = crypto.randomUUID();
    const newAlert = { type, message, id };
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
    const timeoutId = setTimeout(() => {
      removeAlert(id);
    }, 5000);
    timeoutsRef.current[id] = timeoutId;
  }
  function removeAlert(id) {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));

    // Clear the timeout for the alert if it still exists
    if (timeoutsRef.current[id]) {
      clearTimeout(timeoutsRef.current[id]);
      delete timeoutsRef.current[id]; // Clean up the reference
    }
  }

  function clearAlerts() {
    // Clear all timeouts when clearing alerts
    Object.keys(timeoutsRef.current).forEach((id) => {
      clearTimeout(timeoutsRef.current[id]);
    });
    setAlerts([]);
    timeoutsRef.current = {}; // Reset the ref object
  }

  return (
    <AlertContext.Provider
      value={{ alerts, addAlert, clearAlerts, removeAlert }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
