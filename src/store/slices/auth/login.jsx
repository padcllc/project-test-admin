
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "../../../utils/cookies-helper";
import { adminLogin } from "../../../services/auth.service";

const initialState = {
  success: false,
  message: "",
  statusCode: 0,
  statusName: "",
  loading: false,
  accessToken: getCookie("accessToken"),
};

export const adminLoginThunk = createAsyncThunk(
  "admin/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await adminLogin(data);
      setCookie("accessToken", response.data.accessToken, 7);    
      return Promise.resolve(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const AdminLoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    adminLogout: (state) => {
      deleteCookie("accessToken", "");
      state.accessToken = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminLoginThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      adminLoginThunk.fulfilled,
      (state, { payload }) => {
        state.success = true;
        state.accessToken = payload.data.accessToken;
        state.loading = false;
      }
    );
    builder.addCase(adminLoginThunk.rejected, (state, { payload }) => {
      state.message = payload?.message;
      state.success = false;
      state.loading = false;
    });
  },
});

export const { adminLogout } = AdminLoginSlice.actions;

export const getAdminLoginErrorMessages = (state) => {
  return state.adminLogin?.message;
};

export const getAccessToken = (state) => {
  return state.adminLogin.accessToken;
};