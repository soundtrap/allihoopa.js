import {getAppKey, getAppSecret, getAPIDomain} from './config';
import {getAuthCookie} from './auth';

export type APICallback = (successful: boolean, response: any) => void;

export function graphQLQuery(query: any, callback: APICallback) {
    const url = `https://${getAPIDomain()}/v1/graphql`;

    let callbackFired = false;

    const callCallback = (value: boolean, response: any) => {
        if (!callbackFired) {
            callbackFired = true;
            callback(value, response);
        }
    };

    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    const authCookie = getAuthCookie();
    if (!authCookie) {
        // ToDo: handle the case
        throw new Error('No access token.');
    }
    const accessToken = JSON.parse(authCookie);
    xhr.setRequestHeader('ph-access-token', accessToken.access_token);
    const secret = new Buffer(getAppKey() + ':' + getAppSecret()).toString('base64');
    xhr.setRequestHeader('Authorization', 'Basic ' + secret);
    xhr.onload = () => {
        if (xhr.status === 200) {
            callCallback(true, xhr.response);
        } else {
            callCallback(false, xhr.response);
        }
    };

    xhr.send(JSON.stringify(query));
}
