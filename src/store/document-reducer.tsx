import { createAction, Action } from 'redux-actions';
import * as Immutable from 'seamless-immutable';

import { IWbiOrganization, IWbiLayout } from '../services/wbi/wbi-myinfo'

// Action Types - LOAD, CREATE, UPDATE, REMOVE
const UPDATE_ORGANIZATION = 'document/UPDATE_ORGANIZATION';
const UPDATE_LAYOUT = 'document/UPDATE_LAYOUT';
// Action Creators
export const updateOrganization = createAction<IWbiOrganization>(UPDATE_ORGANIZATION);
export const updateLayout = createAction<IWbiLayout>(UPDATE_LAYOUT);


// Reducer
export interface IDocumentReducer {
  organization: IWbiOrganization | null;
  layout: IWbiLayout | null;
}

export const initialState: IDocumentReducer = {
  organization: null,
  layout: null,
};

export default function reducer(state = Immutable.from(initialState), action: Action<any>) {
  switch (action.type) {
   
    case UPDATE_ORGANIZATION:
      return state.merge({
        organization: action.payload,
      });
     case UPDATE_LAYOUT:
      return state.merge({
        layout: action.payload,
      }); 

    default: return state;
  }
}
