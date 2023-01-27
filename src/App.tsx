import { useSyncExternalStore } from "react";
import "./App.css";

const useOnlineStatus = () => {
  function subscribe(callback: () => void) {
    window.addEventListener("online", callback);
    window.addEventListener("offline", callback);

    return () => {
      window.removeEventListener("online", callback);
      window.removeEventListener("offline", callback);
    };
  }

  const getSnapshot = () => {
    console.log("getSnapshot", navigator.onLine);
    return navigator.onLine;
  };

  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  return isOnline;
};

const Status = () => {
  const isOnline = useOnlineStatus();

  return (
    <div className="Card">
      <h4>Network Status</h4>
      <p>
        You are <strong>{isOnline ? "online ✅" : "offline ❌"}</strong>
      </p>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Status />
    </div>
  );
}

export default App;
