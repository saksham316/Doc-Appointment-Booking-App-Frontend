// ---------------------------------------------------------Imports-------------------------------------------------------------------
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  login,
  signUp,
} from "../../Actions/Authentication/authenticationActions";
// -----------------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------------
const initialState = {
  isLoginLoading: false,
  isSignUpLoading: false,
  loggedInUserData: {},
  isUserLoggedIn: false,
  errorMessage: "",
  isUserCreated: false,
};

// -----------------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------Authentication Slice----------------------------------------------------------

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    resetSignUpState: (state, action) => {
      state.isUserCreated = action.payload;
    },
    clearReduxStoreData: (state, action) => {},
    setCounselorProfileUpdation: (state, action) => {
      state.loggedInUserData = {
        ...state.loggedInUserData,
        decodedData: {
          ...state.loggedInUserData.decodedData,
          isCounselorProfileUpdated: true,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder

      // login  lifecycle actions
      .addCase(login.pending, (state, action) => {
        state.isLoginLoading = true;
        state.isUserLoggedIn = false;
        state.loggedInUserData = {};
        state.errorMessage = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoginLoading = false;
        state.isUserLoggedIn = true;
        state.loggedInUserData = action?.payload;
        toast.success("Logged In Successfully");
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.isUserLoggedIn = false;
        state.loggedInUserData = {};
        state.errorMessage = action?.payload?.message;
      })
      // signUp lifecycle actions
      .addCase(signUp.pending, (state, action) => {
        state.isSignUpLoading = true;
        state.isUserLoggedIn = false;
        state.loggedInUserData = {};
        state.isUserCreated = false;
        state.errorMessage = "";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isSignUpLoading = false;
        state.isUserLoggedIn = false;
        state.isUserCreated = true;

        toast.success("User Created Successfully");
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isSignUpLoading = false;
        state.isUserLoggedIn = false;
        state.loggedInUserData = {};
        state.isUserCreated = false;
        state.errorMessage = action?.payload?.message;
      });
  },
});

export const authenticationReducer = authenticationSlice.reducer;
export const {
  resetSignUpState,
  clearReduxStoreData,
  setCounselorProfileUpdation,
} = authenticationSlice.actions;
