import * as React from 'react';
import * as Radium from 'radium';

import {DropPiece} from './DropInterfaces';
import {commonStyles} from './commonStyles';
import * as vars from './constants';

export interface CompletedProps {
    dropPiece: DropPiece | undefined;
    closeFunction: any;
}

@Radium
export default class CompletedView extends React.Component<CompletedProps, {}> {
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
            <div style={[styles.completedView, commonStyles.centeredContainer]}>
                <div style={[styles.completedContainer]}>
                    <button
                        key='closeButton'
                        style={[commonStyles.resetButton, styles.closeButton]}
                        onClick={() => this.handleCloseClick()}
                    >
                        <svg style={[styles.crossImage]} fill='#000000' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
                            <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/>
                            <path d='M0 0h24v24H0z' fill='none'/>
                        </svg>
                    </button>
                    <p style={[styles.completedTitle]}>Drop to Allihoopa completed!</p>
                    { !!this.props.dropPiece && !! this.props.dropPiece.url ?
                        <button
                            key='pieceButton'
                            style={[commonStyles.resetButton, styles.pieceButton]}
                            onClick={(e) => this.handleOpenPiece(e)}
                        >
                            See your new piece in Allihoopa
                        </button>
                        :
                        null
                    }
                </div>
            </div>
        );
    }
}

require('./variables');

const styles = {
    completedView: {
        width: '100%',
        height: '100%'
    },
    completedContainer: {
        textAlign: 'center'
    },
    completedTitle: {
        fontSize: '42px',
        lineHeight: 1.2,
        marginTop: '32px',
        marginBottom: '16px'
    },
    pieceButton: {
        fontSize: '18px',
        padding: '16px 20px',
        borderRadius: '8px',
        background: vars.VIBRANT_GREEN,
        color: 'white',
        ':hover': {
            cursor: 'pointer',
            background: vars.BUTTON_HOVER
        }
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '64px',
        height: '64px',
        ':hover': {
            cursor: 'pointer'
        }
    },
    crossImage: {
        width: '100%',
        height: '100%'
    }
};
