import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userAuthApi } from "../services/UserAuthApi";
import { workspaceApi } from "../services/WorkspaceApi";
import { projectApi } from "../services/ProjectsApi";
import { TaskApi } from "../services/TasksApi";
export const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    [workspaceApi.reducerPath]: workspaceApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [TaskApi.reducerPath]: TaskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userAuthApi.middleware,
      workspaceApi.middleware,
      projectApi.middleware,
      TaskApi.middleware
    ),
});
setupListeners(store.dispatch);
