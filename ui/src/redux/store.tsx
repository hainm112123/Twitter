import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { authSliceReducer } from './authSlice'

const reducer = combineReducers({
  auth: authSliceReducer,
})

const store = configureStore({
  reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch =  useDispatch
export default store