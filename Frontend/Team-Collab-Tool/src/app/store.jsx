import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userAuthApi } from "../services/userAuthApi";
import { workspaceApi } from "../services/WorkspaceApi";
import { projectApi } from "../services/ProjectsApi";
export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [workspaceApi.reducerPath]: workspaceApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userAuthApi.middleware,
      workspaceApi.middleware,
      projectApi.middleware
    ),
});
setupListeners(store.dispatch);
