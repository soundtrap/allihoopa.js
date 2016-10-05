import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Coordinator} from './drop/components/Coordinator';
import {Overlay} from './drop/components/Overlay';
import {DropPiece} from './drop/PieceData';

export type DropCallback = (successful: boolean) => void;

export function drop(props: DropPiece, callback: DropCallback) {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const onClose = () => {
        ReactDOM.unmountComponentAtNode(container);
    };

    ReactDOM.render(
        <Overlay>
            <Coordinator
                input={props}
                onClose={onClose}
            />
        </Overlay>,
        container
    );
}
