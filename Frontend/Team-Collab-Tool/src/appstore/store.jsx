import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// Function to dynamically import APIs
const importAPIs = async () => {
  const [
    { userAuthApi },
    { workspaceApi },
    { projectApi },
    { TaskApi },
    { userApi },
  ] = await Promise.all([
    import("../services/UserAuthApi"),
    import("../services/WorkspaceApi"),
    import("../services/ProjectsApi"),
    import("../services/TasksApi"),
    import("../services/UserViewApi"),
  ]);

  return {
    userAuthApi,
    workspaceApi,
    projectApi,
    TaskApi,
    userApi,
  };
};

// Initialize store inside an async function
const initStore = async () => {
  const { userAuthApi, workspaceApi, projectApi, TaskApi, userApi } =
    await importAPIs();

  const store = configureStore({
    reducer: {
      [userAuthApi.reducerPath]: userAuthApi.reducer,
      [workspaceApi.reducerPath]: workspaceApi.reducer,
      [projectApi.reducerPath]: projectApi.reducer,
      [TaskApi.reducerPath]: TaskApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        userAuthApi.middleware,
        workspaceApi.middleware,
        projectApi.middleware,
        TaskApi.middleware,
        userApi.middleware
      ),
  });

  setupListeners(store.dispatch);

  return store;
};

// Export the initialized store
export const store = initStore();
