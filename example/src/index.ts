import * as Allihoopa from 'allihoopa';

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
    const piece = {
        stems: {
            mixStem: [{
                fileType: 'wav',
                url: 'http://localhost:8080/drop.wav'
            }]
        },
        presentation: {
            title: 'A test piece'
        },
        musicalMetadata: {
            lengthUs: 10000000,
            tempo: {
                fixed: 121
            }
        }
    };

    Allihoopa.drop(piece, (success) => {
        const p = document.createElement('pre');
        p.innerText = JSON.stringify(success ? 'Drop successful' : 'Drop cancelled');

        document.body.appendChild(p);
    });
});
