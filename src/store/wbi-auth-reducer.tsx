import { createAction, Action } from 'redux-actions';
import * as Immutable from 'seamless-immutable';

import {IWbiAuthResponse} from '../services/wbi/wbi-auth'

// Action Types - LOAD, CREATE, UPDATE, REMOVE
const UPDATE_USERNAME = 'wbiAuth/UPDATE_USERNAME';
const UPDATE_PASSWORD = 'wbiAuth/UPDATE_PASSWORD';
const LOGIN = 'wbiAuth/LOGIN'
const LOGIN_SUCCESS = 'wbiAuth/LOGIN_SUCCESS'
const LOGIN_ERROR = 'wbiAuth/LOGIN_ERROR'
const LOGOUT = 'wbiAuth/LOGOUT'
// Action Creators

export const updateUsername = createAction<string>(UPDATE_USERNAME);
export const updatePassword = createAction<string>(UPDATE_PASSWORD);
export const login = createAction<string>(LOGIN);
export const logout = createAction<string>(LOGOUT);
export const loginSuccess = createAction<IWbiAuthResponse>(LOGIN_SUCCESS);
export const loginError = createAction<string>(LOGIN_ERROR);



// Reducer

export interface IWbiAuthReducer {
  username: string;
  password: string;
  isLoading: boolean;
  errorMessage : string | null;
  token: IWbiAuthResponse | null;

}
export const initialState: IWbiAuthReducer = {
  username: '',
  password: '',
  isLoading: false,
  errorMessage: null,
  token: null
};

export default function reducer(state = Immutable.from(initialState), action: Action<any>) {
  switch (action.type) {
   
    case UPDATE_USERNAME:
      return state.merge({
        username: action.payload,
      });
    case UPDATE_PASSWORD:
      return state.merge({
        password: action.payload,
      });
    case LOGIN:
      return state.merge({
        isLoading: true,
        errorMessage: null
      });
    case LOGOUT:
      return state.merge({
        isLoading: false,
        errorMessage: null,
        token: null
      });
    case LOGIN_SUCCESS:
      return state.merge({
        isLoading: false,
        errorMessage: null,
        token : action.payload
      });
    case LOGIN_ERROR:
      return state.merge({
        isLoading: false,
        errorMessage: action.payload,
        token : null
      });
    default: return state;
  }
}
