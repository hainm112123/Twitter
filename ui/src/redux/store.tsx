import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { authSliceReducer } from './authSlice'
import { userSliceReducer } from './userSlice'

const reducer = combineReducers({
  auth: authSliceReducer,
  user: userSliceReducer,
})

const store = configureStore({
  reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch =  useDispatch
export default store