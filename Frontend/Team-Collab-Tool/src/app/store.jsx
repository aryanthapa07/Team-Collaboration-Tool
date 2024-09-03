import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userAuthApi } from "../services/userAuthApi";
import { workspaceApi } from "../services/WorkspaceApi";
export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [workspaceApi.reducerPath]: workspaceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userAuthApi.middleware,
      workspaceApi.middleware
    ),
});
setupListeners(store.dispatch);
