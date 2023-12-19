import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const errorSlice = createSlice({
  name: "error",
  initialState: "" as string,
  reducers: {
    setError: (state, action: PayloadAction<string>) => action.payload,
    clearError: (state) => "",
  },
});

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;
