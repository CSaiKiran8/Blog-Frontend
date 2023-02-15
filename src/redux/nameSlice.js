import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const nameSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setName } = nameSlice.actions;

export default nameSlice.reducer;