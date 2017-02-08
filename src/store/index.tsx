declare var window: Window & { devToolsExtension: any };
import { combineReducers, createStore } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as Immutable from 'seamless-immutable';

import { AppStore } from '../services/local-storage/app-store'
import { default as currencyRatesReducer, ICurrencyRatesReducer } from './currency-rates-reducer';
import { default as wbiAuthReducer, IWbiAuthReducer, initialState as authInitialState} from './wbi-auth-reducer';
import { default as documentReducer, IDocumentReducer, initialState as documentInitialState } from './document-reducer';
import { default as wbiMyInfoReducer, IWbiMyInfoReducer, initialState as myInfoInitialState } from './wbi-myinfo-reducer';

import {IWbiAuthResponse, nullWbiAuthResponse} from '../services/wbi/wbi-auth'

export interface IRootReducer {
  routing: any;
  currencyRates: ICurrencyRatesReducer;
  wbiAuth: IWbiAuthReducer;
  myInfo: IWbiMyInfoReducer;
  document: IDocumentReducer;
}

export const rootReducer = combineReducers({
  routing: routerReducer,
  currencyRates: currencyRatesReducer,
  wbiAuth: wbiAuthReducer,
  myInfo: wbiMyInfoReducer,
  document: documentReducer
});


// rehydrating state on app start: implement here...
const recoverState = function() {

  var initialState = 
  {
      wbiAuth:  authInitialState,
      myInfo: myInfoInitialState,
      document:  documentInitialState
  }
  
  
  var localStore = new AppStore();
  if (localStore.access_token && localStore.access_token != nullWbiAuthResponse.access_token) {
   
    // check if the acccess token is still valid
    const storedAuthResponse : IWbiAuthResponse = { 
      access_token : localStore.access_token,
      token_type: localStore.token_type,
      userName: localStore.userName,
      '.expires' : new Date(localStore['.expires']),
      '.issued' : new Date(localStore['.issued']) 

    };
    initialState.wbiAuth.token = storedAuthResponse;
    console.log ("access token found in localStorage!");

  } else {
    console.log ("no access token found in localStorage!");
  }

  return Immutable.from(initialState);
}


export const store = createStore(
  rootReducer,
  recoverState(),
  window.devToolsExtension && window.devToolsExtension(),
);


// systemjs-hot-reloader hook, rehydrating the state of redux store
export function __reload(exports: any) {
  console.log(exports.store.getState());
}

