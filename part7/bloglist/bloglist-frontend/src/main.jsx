import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogsReducer from "./reducers/blogsReducer";
import usersReducer from "./reducers/usersReducer"
import { BrowserRouter as Router } from "react-router-dom";

import { UserContextProvider } from "./UserContext";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    users: usersReducer
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </Provider>
  </Router>
);
