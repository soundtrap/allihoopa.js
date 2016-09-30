import * as React from 'react';
import * as Radium from 'radium';

import {DropPiece} from './DropInterfaces';

export interface CompletedProps {
    dropPiece: DropPiece | undefined;
}

@Radium
export default class CompletedView extends React.Component<CompletedProps, {}> {
    handleOpenPiece(e: any): void {
        if (!!this.props.dropPiece && !! this.props.dropPiece.url) {
            window.open(this.props.dropPiece.url);
        }
    }

    render() {
        return (
            <div style={[styles.completedView, styles.centeredContainer]}>
                <div style={[styles.completedContainer]}>
                    <p style={[styles.completedTitle]}>Completed!</p>
                    { !!this.props.dropPiece && !! this.props.dropPiece.url ?
                        <button
                            style={[styles.pieceButton]}
                            onClick={(e) => this.handleOpenPiece(e)}>
                        >
                            Here's your new piece!
                        </button>
                        :
                        null
                    }
                </div>
            </div>
        );
    }
}

const vibrantGreen = '#29DB29';

const styles = {
    completedView: {
        width: '100%',
        height: '100%'
    },
    centeredContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    completedContainer: {
        textAlign: 'center'
    },
    completedTitle: {
        fontSize: '48px',
        lineHeight: 1.2,
        marginTop: '32px',
        marginBottom: '16px'
    },
    pieceButton: {
        fontSize: '18px',
        border: 0,
        padding: '16px 20px',
        background: vibrantGreen,
        ':hover': {
            cursor: 'pointer'
        }
    }
};
