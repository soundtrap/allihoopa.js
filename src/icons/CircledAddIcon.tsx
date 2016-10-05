import * as React from 'react';

export function CircledAddIcon(props: any): JSX.Element {
    return (
        <svg
            width='20px'
            height='20px'
            viewBox='0 0 20 20'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <path
                d='M11,5 L9,5 L9,9 L5,9 L5,11 L9,11 L9,15 L11,15 L11,11 L15,11 L15,9 L11,9 L11,5 L11,5 Z M10,0 C4.5,0 0,4.5 0,10 C0,15.5 4.5,20 10,20 C15.5,20 20,15.5 20,10 C20,4.5 15.5,0 10,0 L10,0 Z M10,18 C5.6,18 2,14.4 2,10 C2,5.6 5.6,2 10,2 C14.4,2 18,5.6 18,10 C18,14.4 14.4,18 10,18 L10,18 Z'
                fill='#9B9B9B'
            />
        </svg>
    );
}
