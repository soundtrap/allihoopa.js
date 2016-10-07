import * as Radium from 'radium';
import * as React from 'react';

import * as CommonStyles from '../styles/CommonStyles';
import {CreatedPiece} from '../DropInterfaces';

export interface CompletedProps {
    dropPiece: CreatedPiece | undefined;
    closeFunction: () => void;
}

@Radium
export class CompletedView extends React.Component<CompletedProps, {}> {
    handleOpenPiece(e: any): void {
        if (!!this.props.dropPiece && !! this.props.dropPiece.url) {
            window.open(this.props.dropPiece.url);
        }
    }

    handleCloseClick(): void {
        this.props.closeFunction();
    }

    render() {
        return (
            <div style={[VIEW_STYLE, CommonStyles.CENTERED_CONTAINER_STYLE]}>
                <div style={CONTAINER_STYLE}>
                    <button
                        key='closeButton'
                        style={[CommonStyles.RESET_BUTTON_STYLE, CLOSE_BUTTON_STYLE]}
                        onClick={() => this.handleCloseClick()}
                    >
                        <svg style={CROSS_IMAGE_STYLE} fill='#000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
                            <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/>
                            <path d='M0 0h24v24H0z' fill='none'/>
                        </svg>
                    </button>
                    <p style={TITLE_STYLE}>Drop to Allihoopa completed!</p>
                    {!!this.props.dropPiece && !!this.props.dropPiece.url ?
                        <button
                            key='pieceButton'
                            style={[CommonStyles.RESET_BUTTON_STYLE, PIECE_BUTTON_STYLE]}
                            onClick={(e) => this.handleOpenPiece(e)}
                        >
                            See your new piece in Allihoopa
                        </button>
                        : null }
                </div>
            </div>
        );
    }
}

const VIEW_STYLE = {
    width: '100%',
    height: '100%',
};
const CONTAINER_STYLE = {
    textAlign: 'center',
};
const TITLE_STYLE = {
    fontSize: '42px',
    lineHeight: 1.2,
    marginTop: '32px',
    marginBottom: '16px',
};
const PIECE_BUTTON_STYLE = {
    fontSize: '18px',
    padding: '16px 20px',
    borderRadius: '8px',
    background: CommonStyles.VIBRANT_GREEN_COLOR,
    color: 'white',
    ':hover': {
        cursor: 'pointer',
        background: CommonStyles.BUTTON_HOVER_COLOR,
    },
};

const CLOSE_BUTTON_STYLE = {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '64px',
    height: '64px',
    ':hover': {
        cursor: 'pointer',
    },
};

const CROSS_IMAGE_STYLE = {
    width: '100%',
    height: '100%',
};
