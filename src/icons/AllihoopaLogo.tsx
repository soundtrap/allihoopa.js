import * as Radium from 'radium';
import * as React from 'react';

export enum LogoMode {
    Default,
    WhiteMonochrome,
}

export interface AllihoopaLogoProps extends React.HTMLAttributes {
    mode?: LogoMode;
}

@Radium
export class AllihoopaLogo extends React.Component<AllihoopaLogoProps, void> {
    render(): JSX.Element {
        let mode = this.props.mode || LogoMode.Default;

        if (mode === LogoMode.Default) {
            return (
                <svg
                    viewBox='0 0 111 111'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    {...this.props}
                >
                    <path
                        d='M29.2,41.4 C29.2,37.7 29.7,34 30.7,30.6 C13.4,35.2 0.6,51.2 0.6,70 C0.6,92.6 18.9,110.9 41.5,110.9 C60.3,110.9 76.3,98.1 80.9,80.8 C77.5,81.8 73.8,82.3 70.1,82.3 C47.5,82.3 29.2,64 29.2,41.4 L29.2,41.4 Z'
                        fill='#29db29'
                    />
                    <path
                        d='M111,41.4 C111,18.8 92.7,0.5 70.1,0.5 C51.3,0.5 35.3,13.3 30.7,30.6 C34.1,29.6 37.8,29.1 41.5,29.1 C64.1,29.1 82.4,47.4 82.4,70 C82.4,73.7 81.9,77.4 80.9,80.8 C98.2,76.1 111,60.2 111,41.4 L111,41.4 Z'
                        fill='#ff27ff'
                    />
                    <path
                        d='M41.5,29.1 C37.8,29.1 34.1,29.6 30.7,30.6 C29.7,34 29.2,37.7 29.2,41.4 C29.2,64 47.5,82.3 70.1,82.3 C73.8,82.3 77.5,81.8 80.9,80.8 C81.9,77.4 82.4,73.7 82.4,70 C82.4,47.4 64.1,29.1 41.5,29.1 L41.5,29.1 Z'
                        fill='#292129'
                    />
                </svg>
            );
        }
        else if (mode === LogoMode.WhiteMonochrome) {
            return (
                <svg
                    viewBox='0 0 81 81'
                    version='1.1'
                    xmlns='http://www.w3.org/2000/svg'
                    {...this.props}>
                    <path
                        d='M57.7995349,62.0982667 C53.3370372,73.0668093 42.571556,80.7995349 30,80.7995349 C13.4314575,80.7995349 0,67.3680774 0,50.7995349 C0,38.2279789 7.73272564,27.4624977 18.7012682,23 C18.2416524,25.1942723 18,27.4686831 18,29.7995349 C18,48.0249316 32.7746033,62.7995349 51,62.7995349 C53.3308517,62.7995349 55.6052625,62.5578825 57.7995456,62.0982644 Z'
                        fill='#ffffff'
                    />
                    <path
                        d='M62.0982667,57.7995349 C73.0668093,53.3370372 80.7995349,42.571556 80.7995349,30 C80.7995349,13.4314575 67.3680774,0 50.7995349,0 C38.2279789,0 27.4624977,7.73272564 23,18.7012682 C25.1942723,18.2416524 27.4686831,18 29.7995349,18 C48.0249316,18 62.7995349,32.7746033 62.7995349,51 C62.7995349,53.3308517 62.5578825,55.6052625 62.0982644,57.7995456 Z'
                        fill='#ffffff'
                    />
                    <path
                        d='M58.938451,58.938451 C59.6304926,56.4099192 60,53.7481111 60,51 C60,34.4314575 46.5685425,21 30,21 C27.2518889,21 24.5900808,21.3695074 22.061549,22.061549 C21.3695074,24.5900808 21,27.2518889 21,30 C21,46.5685425 34.4314575,60 51,60 C53.7481111,60 56.4099192,59.6304926 58.938451,58.938451 Z'
                        fill='#ffffff'
                    />
                </svg>
            );
        }
        else {
            throw new Error('Internal error: unknown LogoMode');
        }
    }
}
