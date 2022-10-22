import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";

export const register = createAsyncThunk("user/register", async (payload) => {
  const data = await userApi.register(payload);

  // save data to local
  localStorage.setItem("acction_token", data.data.jwt);
  localStorage.setItem("user", JSON.stringify(data.data.user));

  // return
  return data.data.user;
});

export const login = createAsyncThunk("user/login", async (payload) => {
  const data = await userApi.login(payload);

  // save data to local
  localStorage.setItem("acction_token", data.data.jwt);
  localStorage.setItem("user", JSON.stringify(data.data.user));

  // return
  return data.data.user;
});
const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem("user")) || {},
    setting: {},
  },
  reducers: {
    logout(state) {
      localStorage.removeItem("acction_token");
      localStorage.removeItem("user");

      state.current = {};
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;

export default reducer;
