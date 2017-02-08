
import { validateStatusCode, logRejection } from '../../utils/index';
import  'isomorphic-fetch';

// Get the latest foreign exchange reference rates in JSON format.

const WBI_AUTH_URL = 'http://wbidatabackend.azurewebsites.net/token';

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

// get a user-token from wbi service
export async function authenticate(username: string, password:string):
  Promise<IWbiAuthResponse> {
  try {
    let response = await fetch(WBI_AUTH_URL,
    {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:
        "username=" + username + "&password=" + password + "&grant_type=password"
    });
    validateStatusCode(response);
    return response.json();
  } catch (err) {
    logRejection(err);
    throw(err);
  }
}
