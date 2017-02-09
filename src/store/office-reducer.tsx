import { createAction, Action } from 'redux-actions';
import * as Immutable from 'seamless-immutable';

// Action Types - LOAD, CREATE, UPDATE, REMOVE
const UPDATE_INITIALIZED = 'office/INITIALIZED';

// Action Creators
export const officeInitialized = createAction<string>(UPDATE_INITIALIZED);

// Reducer
export interface IOfficeReducer {
  initialized: boolean;
  reason: string
}
export const initialState: IOfficeReducer = {
  initialized: false,
  reason: ""
};

export default function reducer(state = Immutable.from(initialState), action: Action<any>) {
  switch (action.type) {
   
    case UPDATE_INITIALIZED:
      return state.merge({
        initialized: true,
        reason: action.payload,
      });
    
    default: return state;
  }
}
