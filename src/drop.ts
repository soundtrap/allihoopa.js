import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {DropOverlay} from './drop/DropOverlay';
import {DropOverlayProps} from './drop/DropInterfaces';

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
