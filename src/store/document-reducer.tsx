import { createAction, Action } from 'redux-actions';
import * as Immutable from 'seamless-immutable';

import { IWbiOrganization, IWbiLayout, IWbiDocument } from '../services/wbi/wbi-types'

// Action Types - LOAD, CREATE, UPDATE, REMOVE
const UPDATE_ORGANIZATION = 'document/UPDATE_ORGANIZATION';
const UPDATE_LAYOUT = 'document/UPDATE_LAYOUT';
const UPDATE_TITLE = 'document/UPDATTE_TITE';
const UPDATE_DESCRIPTION = 'document/UPDATTE_DESCRIPTION';
const UPDATE_URL = 'document/UPDATTE_URL';
const UPDATE_WBIDATA = 'document/UPDATTE_WBIDATA';
const UPDATE_ISLOADING = 'document/UPDATTE_ISLOADING';

// Action Creators
export const updateOrganization = createAction<IWbiOrganization>(UPDATE_ORGANIZATION);
export const updateLayout = createAction<IWbiLayout>(UPDATE_LAYOUT);
export const updateTitle = createAction<string>(UPDATE_TITLE);
export const updateDescription = createAction<string>(UPDATE_DESCRIPTION);
export const updateUrl = createAction<string>(UPDATE_URL);
export const updateWbiData = createAction<IWbiDocument>(UPDATE_WBIDATA);
export const updateIsLoading = createAction<boolean>(UPDATE_ISLOADING);
// Reducer
export interface IDocumentReducer {
  organization: IWbiOrganization | null;
  layout: IWbiLayout | null;
  number : string;
  url : string;
  title : string;
  description: string;
  error: string;
  isLoading: boolean;
  wbiData : IWbiDocument | null;
}

export const initialState: IDocumentReducer = {
  organization: null,
  layout: null,
  number: "",
  url: "",
  title: "",
  description: "",
  error: "",
  isLoading: false,
  wbiData : null
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
     case UPDATE_TITLE:
      return state.merge({
        title: action.payload,
      }); 
      case UPDATE_DESCRIPTION:
      return state.merge({
        description: action.payload,
      }); 
      case UPDATE_URL:
      return state.merge({
        url: action.payload,
      }); 
      case UPDATE_ISLOADING:
      return state.merge({
        isLoading: action.payload,
      }); 
      case UPDATE_WBIDATA:
      return state.merge({
        isLoading: false,
        wbiData: action.payload,
      }); 
    default: return state;
  }
}
