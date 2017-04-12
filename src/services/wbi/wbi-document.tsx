
import { validateStatusCode, logRejection } from '../../utils/index';
import { AppStore } from '../local-storage/app-store';
import { IWbiDocument, WBI_DOCUMENTS_URL, IWbiPatchDocument, IWbiAddDocument } from './wbi-types';

// Get the latest foreign exchange reference rates in JSON format.


// get a info for the currently logged in user
export async function requestByUrl(url: string): Promise<IWbiDocument> {
  try {
    var local_store = new AppStore();
    // create rest url
    let requestUrl = WBI_DOCUMENTS_URL+'/findByUrl?url=' + encodeURIComponent(url);
    console.log("REQUST:" + requestUrl);
    // call rest-service
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
    // check http and REST status of API call response
    validateStatusCode(response);
    // return API response as IWbiDocument object
    return response.json();

  } catch (err) {
    logRejection(err);
    throw(err);
  }
}

// call the API function to insert a new document in the list
export async function addDocument(doc: IWbiAddDocument): Promise<IWbiDocument> {
  try {
    var local_store = new AppStore();
    // create the REST url for API call
    let requestUrl = WBI_DOCUMENTS_URL;
    console.log("REQUST:" + requestUrl);
    // call API function with the data to insert.
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
    // validate HTTP and REST status
    validateStatusCode(response);
    // return response form API as IWbiDocument
    // this is containing the new number of the document
    return response.json();
  } catch (err) {
    logRejection(err);
    throw(err);
  }
}

// call the API function to update the document with the given id with informations.
export async function patchDocument(id:string, doc: IWbiPatchDocument): Promise<IWbiDocument> {
  try {
    var local_store = new AppStore();
    // create the REST url for API call
    let requestUrl = WBI_DOCUMENTS_URL+'?id=' + id;
    console.log("REQUST:" + requestUrl);
    // call API function with the data to patch
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
    // validate HTTP and REST status
    validateStatusCode(response);
    // return response from API as IWbiDocument object
    return response.json();
  } catch (err) {
    logRejection(err);
    throw(err);
  }
}