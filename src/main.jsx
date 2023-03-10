import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/css/app.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import storeInit from "./redux/store";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={storeInit.store}>
    <PersistGate loading={null} persistor={storeInit.persistor}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
