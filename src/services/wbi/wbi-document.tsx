
import { validateStatusCode, logRejection } from '../../utils/index';
import { AppStore } from '../local-storage/app-store';
import { IWbiDocument } from './wbi-types';

// Get the latest foreign exchange reference rates in JSON format.

const WBI_DOCUMENT_URL = 'http://wbidatabackend.azurewebsites.net/api/my/documents';

// get a info for the currently logged in user
export async function findByUrl(url: string):
  Promise<IWbiDocument> {
  try {
    var local_store = new AppStore();
    let response = await fetch(WBI_DOCUMENT_URL+'/findByUrl&url=' + encodeURIComponent(url),
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
