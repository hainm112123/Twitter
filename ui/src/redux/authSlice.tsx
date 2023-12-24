import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios'
import { AppDispatch } from "./store";
import { loginUrl, logoutUrl, refreshUrl, signupUrl } from "../variables/urls";

type authState = {
  access_token: string | null,
  refresh_token: string | null,
}

const initialState: authState = {
  access_token: null,
  refresh_token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<authState>) {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
    },
    refreshSuccess(state, action: PayloadAction<string>) {
      state.access_token = action.payload;
    },
    logoutSuccess(state, action) {
      state.access_token = null;
      state.refresh_token = null;
    }
  }
})

export const { loginSuccess, refreshSuccess, logoutSuccess } = authSlice.actions;

export const login = ({ username, password }: {username: string, password: string}) => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.post(
      loginUrl,
      axios.toFormData({username, password})
    );
    console.log({username, password})
    if (res.data.access_token) {
      dispatch(loginSuccess(res.data));
      return true;
    }
    else {
      return false;
    }
  } catch(err) {
    console.error(err)
    return false;
  }
}

export const refresh = (refresh_token: string) => async (dispatch: AppDispatch) => {
  const res = await axios.post(
    refreshUrl,
    {},
    {
      headers: {
        Authorization: `Bearer ${refresh_token}` 
      }
    }
  )
  dispatch(refreshSuccess(res.data))
}

export const signup = ({name, username, password, retype_password} : {name: string, username: string, password: string, retype_password: string}) => async (dispatch: AppDispatch) => {
  await axios.post(
    signupUrl,
    {name, username, password, retype_password}
  )
}

export const logout = ({access_token, refresh_token} : {access_token: string, refresh_token: string}) => async (dispatch: AppDispatch) => {
  dispatch(logoutSuccess({}))
  await Promise.all([
    axios.delete(
      logoutUrl,
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    ),
    axios.delete(
      logoutUrl,
      {
        headers: {
          Authorization: `Bearer ${refresh_token}`
        }
      }
    )
  ])
}

export const authSliceReducer = authSlice.reducer