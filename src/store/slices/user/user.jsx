
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, deleteUserById, getUserById, getUsers, updateUserById } from "../../../services/user.services";

const initialState = {
  success: false,
  message: "",
  errors: [],
  statusCode: 0,
  statusName: "",
  loading: false,
  projects: [],
  isCreated: false,
  isDeleted: false,
  isUpdated: false,
  memberByID: {},
};

export const getUsersThunk = createAsyncThunk(
  "users/getusers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUsers();
      return Promise.resolve(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createUserThunk = createAsyncThunk(
  "users/createUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createUser(data);
      return Promise.resolve(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserByIdThunk = createAsyncThunk(
  "users/getuserById",
  async (data, { rejectWithValue }) => {
    try {
      const response = await getUserById(data);
      return Promise.resolve(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserByThunk = createAsyncThunk(
  "users/updateUserMemberById",
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateUserById(data);
      return Promise.resolve(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteUserByIdThunk = createAsyncThunk(
  "users/deleteUserById",
  async (data, { rejectWithValue }) => {
    try {
      const response = await deleteUserById(data);
      return Promise.resolve(response);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const UserSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getUsersThunk.fulfilled,
      (state, { payload }) => {
        state.success = true;
        state.loading = false;
        state.projects = payload.data;
        state.memberByID = {};
        state.isCreated = false;
        state.isDeleted = false;
        state.isUpdated = false;
      }
    );
    builder.addCase(getUsersThunk.rejected, (state, { payload }) => {
      state.message = payload?.message || "";
      state.success = false;
      state.loading = false;
    });

    builder.addCase(createUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      createUserThunk.fulfilled,
      (state, { payload }) => {
        state.success = true;
        state.loading = false;
        state.isCreated = true;
        state.isDeleted = false;
        state.isUpdated = false;
        state.memberByID = {};
        state.errors = [];
      }
    );
    builder.addCase(createUserThunk.rejected, (state, { payload }) => {
      state.message = payload?.message;
      state.success = false;
      state.loading = false;
      state.isCreated = false;
      state.isDeleted = false;
      state.isUpdated = false;
      state.errors = payload.errors;
    });


    builder.addCase(getUserByIdThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getUserByIdThunk.fulfilled,
      (state, { payload }) => {
        state.success = true;
        state.loading = false;
        state.isCreated = false;
        state.isDeleted = false;
        state.isUpdated = false;
        state.memberByID = payload.data;
        state.projects = [];
        state.errors = [];
      }
    );
    builder.addCase(getUserByIdThunk.rejected, (state, { payload }) => {
      state.message = payload?.message || "";
      state.success = false;
      state.loading = false;
      state.isCreated = false;
      state.isDeleted = false;
      state.isUpdated = false;
    });


    builder.addCase(updateUserByThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      updateUserByThunk.fulfilled,
      (state, { payload }) => {
        state.success = true;
        state.loading = false;
        state.isCreated = false;
        state.isDeleted = false;
        state.isUpdated = true;
        state.errors = [];
      }
    );
    builder.addCase(updateUserByThunk.rejected, (state, { payload }) => {
      state.message = payload?.message;
      state.errors = payload.errors;
      state.success = false;
      state.loading = false;
      state.isCreated = false;
      state.isDeleted = false;
      state.isUpdated = false;

    });

    builder.addCase(deleteUserByIdThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      deleteUserByIdThunk.fulfilled,
      (state, { payload }) => {
        state.success = true;
        state.loading = false;
        state.isCreated = false;
        state.isDeleted = true;
        state.isUpdated = false;
      }
    );
    builder.addCase(deleteUserByIdThunk.rejected, (state, { payload }) => {
      state.message = payload?.message || "";
      state.errors = payload.errors;
      state.success = false;
      state.loading = false;
      state.isCreated = false;
      state.isDeleted = false;
      state.isUpdated = false;
    });
  },
});

export const getMembersList = (state) => {
  return state.user?.projects;
};
export const isMemberCreated = (state) => {
  return state.user?.isCreated;
};
export const isMemberDeleted = (state) => {
  return state.user?.isDeleted;
};
export const isMemberUpdated = (state) => {
  return state.user?.isUpdated;
};
export const getOneMember = (state) => {
  return state.user?.memberByID;
};
export const getTeamsErrors = (state) => {
  return state.user?.errors
};