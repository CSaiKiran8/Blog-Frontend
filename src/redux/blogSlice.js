import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlog: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBlog } = blogSlice.actions;

export default blogSlice.reducer;