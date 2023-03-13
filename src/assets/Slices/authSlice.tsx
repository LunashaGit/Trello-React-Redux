import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import BASE_URL from "../api/database";
import axios from "axios";
const initialState = {
  registerStatus: "idle",
  user: {
    name: "",
    email: "",
    password: "",
  },
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    values: {
      name: string;
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(`${BASE_URL}user/signup`, {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      return data;
    } catch (err: string | any) {
      // if 400 error from server
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err);
    }
  }
);

// Create a slice of the state for the auth reducer Login Sign Up Logout

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      return {
        ...state,
        registerStatus: "fulfilled",
        user: action.payload,
      };
    });
    builder.addCase(registerUser.rejected, (state) => {
      return { ...state, registerStatus: "rejected" };
    });
  },
});

export default authSlice.reducer;
