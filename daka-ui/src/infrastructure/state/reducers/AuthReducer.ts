import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { refreshTokenRequest } from "../../../service/AuthenticationService";
import Token from "../../../model/user/Token";
import User from "../../../model/user/User";
import { getUserDetails } from "../../../service/UserService";

export interface AuthState {
  token: Token | null;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

export const login = (tokenData: Token) => {
  return async (dispatch: Dispatch) => {
    try {
      await dispatch(loginSuccess(tokenData));
      const userResponse = await getUserDetails();

      return dispatch(requestUserDetails(userResponse.data));
    } catch (error) {
      return error;
    }
  };
};

export const register = (tokenData: Token) => {
  return async (dispatch: Dispatch) => {
    try {
      await dispatch(loginSuccess(tokenData));
      const userResponse = await getUserDetails();

      return await dispatch(requestUserDetails(userResponse.data));
    } catch (error) {
      return error;
    }
  };
};

export const refreshToken = (tokenData: Token | null) => {
  return async (dispatch: Dispatch) => {
    try {
      if (!tokenData) return dispatch(logoutSuccess());
      const response = await refreshTokenRequest(tokenData);

      return await dispatch(loginSuccess(response.data));
    } catch (error) {
      return error;
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch) => {
    try {
      return dispatch(logoutSuccess());
    } catch (error) {
      return error;
    }
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    requestUserDetails: (state, action) => {
      state.user = action.payload;
      return state;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload;
      return state;
    },
    logoutSuccess: () => {
      return initialState;
    },
  },
});

export const { loginSuccess, logoutSuccess, requestUserDetails } =
  authSlice.actions;

export default authSlice.reducer;
