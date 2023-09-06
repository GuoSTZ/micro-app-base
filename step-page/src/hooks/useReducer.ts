import { useSelector } from 'react-redux';
import { namespace, initialState } from '@/reducer';

type ReducerState = {
  appReducer: {
    [key: string]: any;
  },
  fetchingReducer: {
    [key: string]: any;
  }
} & {
  [key: string]: InitialStateType;
}

type InitialStateType = typeof initialState;

const useReducer = () => {
  return useSelector<ReducerState, InitialStateType>(state => state[namespace]);
}

const useAppReducer = () => {
  return useSelector<ReducerState>(state => state.appReducer)
}

export default useReducer
export { useAppReducer }
