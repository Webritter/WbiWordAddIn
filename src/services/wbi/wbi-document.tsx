
import { validateStatusCode, logRejection } from '../../utils/index';
import { AppStore } from '../local-storage/app-store';
import { IWbiDocument, WBI_DOCUMENTS_URL, IWbiPatchDocument, IWbiAddDocument } from './wbi-types';

// Get the latest foreign exchange reference rates in JSON format.


// get a info for the currently logged in user
export async function requestByUrl(url: string): Promise<IWbiDocument> {
  try {
    var local_store = new AppStore();
    let requestUrl = WBI_DOCUMENTS_URL+'/findByUrl?url=' + encodeURIComponent(url);
    console.log("REQUST:" + requestUrl);
    let response = await fetch(requestUrl,
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

export async function addDocument(doc: IWbiAddDocument): Promise<IWbiDocument> {
  try {
    var local_store = new AppStore();
    let requestUrl = WBI_DOCUMENTS_URL;
    console.log("REQUST:" + requestUrl);
    let response = await fetch(requestUrl,
    {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + local_store.access_token,
            'Host': window.location.hostname
        },
        body : JSON.stringify(doc)

    });
    validateStatusCode(response);
    return response.json();
  } catch (err) {
    logRejection(err);
    throw(err);
  }
}

export async function patchDocument(id:string, doc: IWbiPatchDocument): Promise<IWbiDocument> {
  try {
    var local_store = new AppStore();
    let requestUrl = WBI_DOCUMENTS_URL+'?id=' + id;
    console.log("REQUST:" + requestUrl);
    let response = await fetch(requestUrl,
    {
        method: 'patch',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + local_store.access_token,
            'Host': window.location.hostname
        },
        body : JSON.stringify(doc)

    });
    validateStatusCode(response);
    return response.json();
  } catch (err) {
    logRejection(err);
    throw(err);
  }
}