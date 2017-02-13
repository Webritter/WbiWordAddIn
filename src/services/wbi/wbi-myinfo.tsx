
import  'isomorphic-fetch';
import { validateStatusCode, logRejection } from '../../utils/index';
import {AppStore} from '../local-storage/app-store';
import { IWbiMyInfoResponse, WBI_MYINFO_URL } from './wbi-types';

// get a info for the currently logged in user
export async function requestMyInfo(): Promise<IWbiMyInfoResponse> {
  try {
    var local_store = new AppStore();
    let response = await fetch(WBI_MYINFO_URL,
    {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            "Content-type": "application/x-www-form-urlencoded",
            'Authorization': 'Bearer  ' + local_store.access_token,
        }
    });
    validateStatusCode(response);
    return response.json();
  } catch (err) {
    logRejection(err);
    throw(err);
  }
}
