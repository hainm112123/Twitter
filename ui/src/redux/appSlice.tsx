import { createSlice } from "@reduxjs/toolkit"
import { AppDispatch } from "./store"
import axios from "axios"
import { csrfTokenUrl } from "../variables/urls"

type AppState = {
  csrf_token: any,
}

const initialState: AppState = {
  csrf_token: null,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCrsfToken(state, action) {
      state.csrf_token = action.payload
    }
  }
})

export const { setCrsfToken } = appSlice.actions;

export const getCsrfToken = () => async (dispatch: AppDispatch) => {
  const res = await axios.get(csrfTokenUrl);
  // console.log(res);
  dispatch(setCrsfToken(res.data));

  // const res = await fetch(csrfTokenUrl, {method: "get"})
  // dispatch(setCrsfToken(JSON.stringify(res.json())))
}

export const appSliceReducer = appSlice.reducer;

