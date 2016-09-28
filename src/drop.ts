import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {DropOverlay} from './drop/DropOverlay';
import {DropOverlayProps, MixStem} from './drop/DropInterfaces';

import {graphQLQuery} from './graphql';

export type DropCallback = (successful: boolean) => void;

export function drop(payload: DropOverlayProps, callback: DropCallback) {
    let element: HTMLElement;
    element = (<HTMLElement>document.getElementById('drop-container'));
    if (!element) {
        element = document.createElement('div');
        element.setAttribute('id', 'drop-container');
        document.body.appendChild(element);
    }

    let callbackFired = false;

    if (!element) {
        throw new Error('Could not find element');
    }

    ReactDOM.render(
        React.createElement(DropOverlay, payload),
        element
    );

    const callCallback = (value: boolean) => {
        if (!callbackFired) {
            callbackFired = true;
            callback(value);
        }
    };

    callCallback(true);
}

export type GetPieceBytesCallback = (mixStemsBlob: any) => void;

export function getPieceBytes(mixStems: MixStem, callback: GetPieceBytesCallback) {
    if (mixStems.url.length > 0) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', mixStems.url);
        xhr.responseType = 'blob';
        xhr.onload = () => {
            if (xhr.status === 200) {
                const mixStemsBlob = xhr.response;

                if (!mixStemsBlob || mixStemsBlob.size <= 0) {
                    throw new Error('Could not load file.');
                }

                callback(mixStemsBlob);
            } else {
                throw new Error('Could not load file. Server responded with ' + xhr.status);
            }
        };
        xhr.send();
    }
}

export type GetUrlsCallback = (urls: Array<string>) => void;

export function getUrls(count: number, callback: GetUrlsCallback) {
    const query = {
        query: `
            mutation ($count: Int!) {
                uploadUrls(count: $count) {
                    urls
                }
            }`,
        variables: { count: count }
    };

    graphQLQuery(query, (success, resp) => {
        if (success) {
            const urls: Array<string> = (JSON.parse(resp)).data.uploadUrls.urls;

            callback(urls);
        }
    });
}