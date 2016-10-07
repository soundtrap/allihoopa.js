import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Coordinator} from './drop/components/Coordinator';
import {Overlay} from './drop/components/Overlay';
import {DropPiece} from './drop/PieceData';

import {authenticate} from './auth';

export type DropCallback = (successful: boolean) => void;

export function drop(props: DropPiece, callback: DropCallback) {
    authenticate(success => {
        if (success) {
            renderDrop(props, callback);
        }
    });
}

function renderDrop(piece: DropPiece, callback: DropCallback) {
    const container = document.createElement('div');
    document.body.appendChild(container);

    let successful = false;

    const onClose = () => {
        ReactDOM.unmountComponentAtNode(container);
        callback(successful);
    };

    const onComplete = () => {
        successful = true;
    };

    ReactDOM.render(
        <Overlay>
            <Coordinator
                input={piece}
                onClose={onClose}
                onDropComplete={onComplete}
            />
        </Overlay>,
        container
    );
}
