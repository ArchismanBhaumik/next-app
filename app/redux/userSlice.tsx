import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  _id: string | null;
  name: string | null;
  email: string | null;
  address: string | null;
};

const initialState: UserState = {
  _id: null,
  name: null,
  email: null,
  address: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.address = action.payload.address ?? null;
    },
    clearUser: (state) => {
      state._id = null;
      state.name = null;
      state.email = null;
      state.address = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
