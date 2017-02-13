import { createAction, Action } from 'redux-actions';
import * as Immutable from 'seamless-immutable';

// Action Types - LOAD, CREATE, UPDATE, REMOVE
const UPDATE_INITIALIZED = 'office/INITIALIZED';
const UPDATE_URL = 'office/UPDATE_URL';

// Action Creators
export const officeInitialized = createAction<string>(UPDATE_INITIALIZED);
export const updateUrl = createAction<string>(UPDATE_URL);
// Reducer
export interface IOfficeReducer {
  initialized: boolean;
  reason: string;
  url: string;

}
export const initialState: IOfficeReducer = {
  initialized: false,
  reason: "",
  url: ""
};

export default function reducer(state = Immutable.from(initialState), action: Action<any>) {
  switch (action.type) {
   
    case UPDATE_INITIALIZED:
      return state.merge({
        initialized: true,
        reason: action.payload,
      });
    case UPDATE_URL:
      return state.merge({
        url: action.payload,
      });   
    default: return state;
  }
}
