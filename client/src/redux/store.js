import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer/userSlice";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import { persistReducer } from "redux-persist";
import themeRedcuer from "./theme/themeSlice";

const rootReducer = combineReducers({ user: userReducer, theme: themeRedcuer });

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
