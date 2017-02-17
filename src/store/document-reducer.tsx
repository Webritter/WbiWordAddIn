import { createAction, Action } from 'redux-actions';
import * as Immutable from 'seamless-immutable';

import { IWbiOrganization, IWbiLayout, IWbiDocument,IWbiOwner } from '../services/wbi/wbi-types'
import { insertHeader, clearHeader} from '../services/office/header-footer'

import { IDropdownOption } from 'office-ui-fabric-react/lib/DropDown'

// Action Types - LOAD, CREATE, UPDATE, REMOVE
const UPDATE_ORGANIZATION = 'document/UPDATE_ORGANIZATION';
const UPDATE_LAYOUT = 'document/UPDATE_LAYOUT';
const UPDATE_OWNER = 'document/UPDATE_OWNER';
const UPDATE_TITLE = 'document/UPDATTE_TITE';
const UPDATE_DESCRIPTION = 'document/UPDATTE_DESCRIPTION';
const UPDATE_URL = 'document/UPDATTE_URL';
const UPDATE_WBIDATA = 'document/UPDATTE_WBIDATA';
const UPDATE_ISLOADING = 'document/UPDATTE_ISLOADING';
const UPDATE_ERROR = 'document/UPDATTE_ERROR';
const UPDATE_OFFICE = 'document/UPDATTE_OFFICE';

// Action Creators
export const updateOrganization = createAction<IWbiOrganization>(UPDATE_ORGANIZATION);
export const updateLayout = createAction<IWbiLayout>(UPDATE_LAYOUT);
export const updateOwner = createAction<IWbiLayout>(UPDATE_OWNER);
export const updateTitle = createAction<string>(UPDATE_TITLE);
export const updateDescription = createAction<string>(UPDATE_DESCRIPTION);
export const updateUrl = createAction<string>(UPDATE_URL);
export const updateWbiData = createAction<IWbiDocument>(UPDATE_WBIDATA);
export const updateIsLoading = createAction<boolean>(UPDATE_ISLOADING);
export const updateError = createAction<string>(UPDATE_ERROR);
export const updateOffice = createAction<boolean>(UPDATE_OFFICE);
// Reducer
export interface IDocumentReducer {
  organization: IWbiOrganization | null;
  layout: IWbiLayout | null;
  owner: IWbiOwner | null;
  number : string;
  url : string;
  title : string;
  description: string;
  errorMessage: string;
  isLoading: boolean;
  wbiData : IWbiDocument | null;
  officeInitialized: boolean;
  layoutOptions : [IDropdownOption] | null
}

export const initialState: IDocumentReducer = {
  organization: null,
  layout: null,
  owner: null,
  number: "",
  url: "",
  title: "",
  description: "",
  errorMessage: "",
  isLoading: false,
  wbiData : null,
  officeInitialized : false,
  layoutOptions : null
};

export default function reducer(state = Immutable.from(initialState), action: Action<any>) {

  switch (action.type) {
   
    case UPDATE_ORGANIZATION:
      return state.merge({
        organization: action.payload,
      });
     case UPDATE_LAYOUT:
      insertHeader(action.payload.Header, (state.wbiData) ? state.wbiData.Id : "", state.title, "","")
      return state.merge({
        layout: action.payload
      }); 
     case UPDATE_TITLE:
      insertHeader((state.layout) ? state.layout.Header : "", (state.wbiData) ? state.wbiData.Id: "", action.payload, "","")
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
      case UPDATE_OFFICE:
      return state.merge({
        officeInitialized: action.payload,
      }); 
      case UPDATE_ERROR:
      return state.merge({
        isLoading: false,
        errorMessage: action.payload,
        wbiData: null
      }); 
      case UPDATE_WBIDATA:
      // update the model with the data from wbi server    
 
      return state.merge({
        isLoading: false,
        errorMessage: "",
        wbiData: action.payload,
        // update the input fields and dropdowns
        description: action.payload.Description,
        title : action.payload.Title,
        layout: action.payload.Layout,
        organization : action.payload.Organization,
        owner: action.payload.Owner
      }); 
    default: return state;
  }
}
