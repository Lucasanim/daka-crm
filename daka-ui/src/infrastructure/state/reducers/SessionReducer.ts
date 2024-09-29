import { createSlice } from "@reduxjs/toolkit";
import SessionData from "../../../model/session/SessionData";

export interface SessionState {
  sessionData: SessionData;
}

const initialState: SessionState = {
  sessionData: {
    darkMode: true,
  },
};

const sessionSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateSession: (state, action) => {
      state.sessionData = action.payload;
      return state;
    },
    changeTheme: (state) => {
      state.sessionData.darkMode = !state.sessionData.darkMode;
      return state;
    },
  },
});

export const { updateSession, changeTheme } = sessionSlice.actions;

export default sessionSlice.reducer;
