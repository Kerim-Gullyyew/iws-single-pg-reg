import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, legacy_createStore as createStore } from "redux";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["parentInformation"],
};

type RootState = ReturnType<typeof reducers>;

const middleware = applyMiddleware(thunk);
const persistedReducer = persistReducer<RootState>(persistConfig, reducers);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(middleware)
);

export const persistor = persistStore(store);

// Export types for better type inference
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
