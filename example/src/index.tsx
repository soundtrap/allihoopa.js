import * as Allihoopa from 'allihoopa';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

declare const ALLIHOOPA_APP_KEY: string;
declare const ALLIHOOPA_APP_SECRET: string;

const authButton = document.querySelector('#js-open-auth');
const dropButton = document.querySelector('#js-open-drop');
console.assert(!!authButton);
console.assert(!!dropButton);

Allihoopa.setup({
    appKey: ALLIHOOPA_APP_KEY,
    appSecret: ALLIHOOPA_APP_SECRET,
});

authButton.addEventListener('click', () => {
    Allihoopa.authenticate((success) => {
        const p = document.createElement('pre');
        p.innerText = JSON.stringify(success ? 'Successful' : 'Cancelled');

        document.body.appendChild(p);
    });
});

dropButton.addEventListener('click', () => {
    const element = document.getElementById('example');

    if (!element) {
        throw new Error('Could not find element');
    }

    ReactDOM.render(
        <Allihoopa.DropOverlay compiler='TypeScript' framework='React' />,
        element
    );
});
