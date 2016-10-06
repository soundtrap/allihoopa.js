import * as React from 'react';

export enum LogoMode {
    Default,
    WhiteMonochrome,
}

export interface AllihoopaLogoProps extends React.HTMLAttributes {
    mode?: LogoMode;
}

export function AllihoopaLogo(props: AllihoopaLogoProps): JSX.Element {
    let mode = props.mode || LogoMode.Default;

    let fills = mode === LogoMode.Default
        ? ['#29db29', '#ff27ff', '#292129']
        : ['#ffffff', '#ffffff', '#ffffff'];

    return (
        <svg
            viewBox='0 0 111 111'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <path
                d='M29.2,41.4 C29.2,37.7 29.7,34 30.7,30.6 C13.4,35.2 0.6,51.2 0.6,70 C0.6,92.6 18.9,110.9 41.5,110.9 C60.3,110.9 76.3,98.1 80.9,80.8 C77.5,81.8 73.8,82.3 70.1,82.3 C47.5,82.3 29.2,64 29.2,41.4 L29.2,41.4 Z'
                fill={fills[0]}
            />
            <path
                d='M111,41.4 C111,18.8 92.7,0.5 70.1,0.5 C51.3,0.5 35.3,13.3 30.7,30.6 C34.1,29.6 37.8,29.1 41.5,29.1 C64.1,29.1 82.4,47.4 82.4,70 C82.4,73.7 81.9,77.4 80.9,80.8 C98.2,76.1 111,60.2 111,41.4 L111,41.4 Z'
                fill={fills[1]}
            />
            <path
                d='M41.5,29.1 C37.8,29.1 34.1,29.6 30.7,30.6 C29.7,34 29.2,37.7 29.2,41.4 C29.2,64 47.5,82.3 70.1,82.3 C73.8,82.3 77.5,81.8 80.9,80.8 C81.9,77.4 82.4,73.7 82.4,70 C82.4,47.4 64.1,29.1 41.5,29.1 L41.5,29.1 Z'
                fill={fills[2]}
            />
        </svg>
    );
}
