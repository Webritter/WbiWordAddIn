
import  'isomorphic-fetch';
import { validateStatusCode, logRejection } from '../../utils/index';
import {AppStore} from '../local-storage/app-store';
import { IWbiMember, WBI_MEMBERS_URL } from './wbi-types';

// get a info for the currently logged in user
export async function searchForMembers(organizationId:number=0, search:string=""): Promise<IWbiMember[]> {
  try {
    var local_store = new AppStore();
    var url:string = WBI_MEMBERS_URL + '/find';

    if (organizationId > 0) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + "OrganizationId=" + encodeURIComponent(organizationId.toString());
    }

    if (search !="") {
      url += (url.indexOf('?') === -1 ? '?' : '&') + "Search=" + encodeURIComponent(search);
    }

    let response = await fetch(url,
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
