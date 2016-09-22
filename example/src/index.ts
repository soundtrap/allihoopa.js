import * as Allihoopa from 'allihoopa';

declare const ALLIHOOPA_APP_KEY: string;
declare const ALLIHOOPA_APP_SECRET: string;

const authButton = document.querySelector('#js-open-auth');
console.assert(!!authButton);

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
