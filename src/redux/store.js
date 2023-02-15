import { configureStore } from "@reduxjs/toolkit";

import nameReducer from "./nameSlice";
import tokenReducer from "./tokenSlice";
import userReducer from "./userSlice";
import blogsReducer from "./blogsSlice";
import blogReducer from "./blogSlice";

const store = configureStore({
  reducer: {
    name: nameReducer,
    token: tokenReducer,
    user:userReducer,
    blog: blogReducer,
    blogs: blogsReducer,
  },
});

export default store;