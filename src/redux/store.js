import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const initialState = {};

const middleware = [thunk];

const persistConfig = {
  // configuration object for redux-persist
  key: "root",
  storage, // define which storage to use
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

const persistor = persistStore(store);

export { store, persistor };
