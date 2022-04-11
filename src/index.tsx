import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import {Provider} from "react-redux";
import Login from "./Pages/Login/Login";
import store from "./redux/store";
import "./styles";
import "./styles/index.tailwind.css";
import React, {useState} from "react";
import Desktop from "./Pages/Desktop/Desktop";

export default function App() {
  const [login, setLogin] = useState<boolean>(false);
  const [booting, setBooting] = useState<boolean>(false);
  const [restart, setRestart] = useState<boolean>(false);
  const [sleep, setSleep] = useState<boolean>(false);

  const shutLinux = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setRestart(false);
    setSleep(false);
    setLogin(false);
    setBooting(true);
  };

  const restartLinux = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setRestart(true);
    setSleep(false);
    setLogin(false);
    setBooting(true);
  };

  const sleepLinux = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setRestart(false);
    setSleep(true);
    setLogin(false);
    setBooting(true);
  };

  if (login) {
    return (
      <Desktop
        setLogin={setLogin}
        shutLinux={shutLinux}
        sleepLinux={sleepLinux}
        restartLinux={restartLinux}
      />
    );
  } else {
    return (
      <Login
        setLogin={setLogin}
        shutLinux={shutLinux}
        sleepLinux={sleepLinux}
        restartLinux={restartLinux}
      />
    );
  }
}


const rootElement = document.getElementById("root")!;
const root =  createRoot(rootElement);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </Provider>
);
