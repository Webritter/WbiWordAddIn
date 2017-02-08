
import { validateStatusCode, logRejection } from '../../utils/index';
import {AppStore} from '../local-storage/app-store';
import { IWbiMyInfoResponse } from './wbi-types';


// Get the latest foreign exchange reference rates in JSON format.

const WBI_MYINFO_URL = 'http://wbidatabackend.azurewebsites.net/api/my/info';

// get a info for the currently logged in user
export async function requestMyInfo():
  Promise<IWbiMyInfoResponse> {
  try {
    var local_store = new AppStore();
    let response = await fetch(WBI_MYINFO_URL,
    {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + local_store.access_token,
            'Host': window.location.hostname
        }
    });
    validateStatusCode(response);
    return response.json();
  } catch (err) {
    logRejection(err);
    throw(err);
  }
}
