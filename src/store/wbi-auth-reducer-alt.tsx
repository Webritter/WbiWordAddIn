import { handleActions, Action, createAction } from 'redux-actions';
import * as Immutable from 'seamless-immutable';


const AUTHENTICATE = 'wbiAuth/AUTHENTICATE';
const AUTHENTICATE_SUCCESS = 'wbiAuth/AUTHENTICATE_SUCCESS';
const AUTHENTICATE_ERROR = 'wbiAuth/AUTHENTICATE_ERROR';

// Action Creators

export const login = () => ({ type: AUTHENTICATE });
export const authenticateSuccess = (payload: any) => ({
  type: AUTHENTICATE_SUCCESS,
  payload: payload,
});
export const authenticateError = (payload: any) => ({
  type: AUTHENTICATE_ERROR,
  payload: payload,
});


// Reducer
export interface IWbiAuthReducer {
  username : string;
  password : string;
  isLoading: boolean;
  isLoggedIn : boolean;
  token: string | null;
  errorMessage: string | null;
  lastAuth: Date | null;

}

const initialState = Immutable.from<IWbiAuthReducer>({
  username : '',
  password : '',
  isLoading: false,
  isLoggedIn : false,
  token: null,
  errorMessage: null,
  lastAuth : null
});


export default handleActions<any, any>({


  [AUTHENTICATE]: (state: typeof initialState, action: Action<void>) => state.merge({
    isLoading: true,
  }),

  [AUTHENTICATE_SUCCESS]: (state: typeof initialState, action: Action<IWbiAuthResponse>) => state.merge({
    isLoading: false,
    errorMessage: null,
    isLoggedIn: true,
    token: action.payload,
    lastUpdated: Date.now(),
  }),
  [AUTHENTICATE_ERROR]: (state: typeof initialState, action: Action<string>) => state.merge({
    isLoading: false,
    errorMessage: action.payload,
  }),
}, initialState);
*/
