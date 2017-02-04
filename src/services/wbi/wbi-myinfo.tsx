
import { validateStatusCode, logRejection } from '../../utils/index';
import {AppStore} from '../local-storage/app-store';

// Get the latest foreign exchange reference rates in JSON format.

const WBI_MYINFO_URL = 'http://wbidatabackend.azurewebsites.net/api/my/info';

export interface IWbiMyInfoResponse {
  FirstName: string;
  LastName: string
  Organizations: [IWbiOrganization] | null;
 }

export interface IWbiLayout {
  Id: number,
  Name: string,
  Info: string,
  Header: string,
  Footer: string
}
export interface IWbiOrganization {
  Id: number,
  Name: string,
  Address: string,
  Phone: string,
  Info: string,
  Contact: string,
  Layouts: [IWbiLayout] | null
}

export const nullWbiMyInfoResponse : IWbiMyInfoResponse = {
  FirstName: "",
  LastName: "",
  Organizations: null
}

// get a info for the currently logged in user
export async function getMyInfo():
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
