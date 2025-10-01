import { AppDispatch, RootStateRedux } from '@/redux/store'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const useReduxDispatch: () => AppDispatch = useDispatch
export const useReduxSelector: TypedUseSelectorHook<RootStateRedux> =
  useSelector
