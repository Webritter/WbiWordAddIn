
import  'isomorphic-fetch';
import { validateStatusCode, logRejection } from '../../utils/index';
import { WBI_AUTH_URL } from './wbi-types';

// Get the latest foreign exchange reference rates in JSON format.


export interface IWbiAuthResponse {
  access_token: string;
  token_type: string
  userName: string;
  '.expires' : Date;
  '.issued' : Date;
}

export const nullWbiAuthResponse : IWbiAuthResponse = {
  access_token : "invalid",
  token_type: "",
  userName: "",
  '.expires' : new Date(),
  '.issued' : new Date()
}

export async function authenticate(username: string, password: string): Promise<IWbiAuthResponse> {
  try {
    let requestUrl = WBI_AUTH_URL;
    let body = "username=" + username + "&password=" + password + "&grant_type=password"
    console.log("REQUST:" + requestUrl);
    let response = await fetch(requestUrl,
    {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"            
        },
        body: body
       
    });
    validateStatusCode(response);
    return response.json();
  } catch (err) {
    logRejection(err);
    throw(err);
  }
}


