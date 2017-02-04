import { createAction, Action } from 'redux-actions';
import * as Immutable from 'seamless-immutable';

import {IWbiMyInfoResponse} from '../services/wbi/wbi-myinfo'

// Action Types - LOAD, CREATE, UPDATE, REMOVE

const MYINFO_REQUEST = 'wbi/MYINFO_REQUEST'
const MYINFO_SUCCESS = 'wbi/MYINFO_SUCCESS'
const MYINFO_ERROR = 'wbi/MYINFO_ERROR'
const MYINFO_CLEAR = 'wbi/MYINFO_CLEAR'
// Action Creators

export const myInfoRequest = createAction<string>(MYINFO_REQUEST);
export const myInfoSuccess = createAction<IWbiMyInfoResponse>(MYINFO_SUCCESS);
export const myInfoError = createAction<string>(MYINFO_ERROR);
export const myInfoClear = createAction<string>(MYINFO_CLEAR);

// Reducer
export interface IWbiMyInfoReducer {
  isLoading: boolean;
  errorMessage : string | null;
  myInfo : IWbiMyInfoResponse | null;

}
export const initialState: IWbiMyInfoReducer = {
  isLoading: false,
  errorMessage: null,
  myInfo : null
};

export default function reducer(state = Immutable.from(initialState), action: Action<any>) {
  switch (action.type) {
   
   case MYINFO_REQUEST:
      return state.merge({
        isLoading: false,
        errorMessage: null,
        myInfo: null
      });
    case MYINFO_SUCCESS:
      return state.merge({
        isLoading: false,
        errorMessage: null,
        myInfo : action.payload
      });
    case MYINFO_ERROR:
      return state.merge({
        isLoading: false,
        errorMessage: action.payload,
        myInfo : null
      });
    case MYINFO_CLEAR:
      return state.merge({
        isLoading: false,
        errorMessage: "",
        myInfo : null
      });
    default: return state;
  }
}
