import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Album } from "../app/types";

export const albumSlice = createSlice({
  name: "albums",
  initialState: [] as Album[],
  reducers: {
    setAlbums: (state, action: PayloadAction<Album[]>) => action.payload,
    removeAlbum: (state, action: PayloadAction<number>) =>
      state.filter((album) => album.id !== action.payload),
    addAlbum: (state, action: PayloadAction<Album>) => {
      state.push(action.payload);
    },
    updateAlbum: (state, action: PayloadAction<Album>) => {
      const index = state.findIndex((album) => album.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { setAlbums, removeAlbum, addAlbum, updateAlbum } =
  albumSlice.actions;

export default albumSlice.reducer;
