import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import {Provider} from "react-redux";
import Login from "./Pages/Login/Login";
import store from "./redux/store";
import "./styles";
import "./styles/index.tailwind.css";
import Desktop from "./Pages/Desktop/Desktop";
import React, {useState} from "react";

export default function App() {
  const [login, setLogin] = useState<boolean>(false);

  if (login) {
    return (<Desktop setLogin={setLogin}/>
    )
  } else {
    return (<Login setLogin={setLogin}/>
    )
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
