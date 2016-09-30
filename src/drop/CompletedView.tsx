import * as React from 'react';
import * as Radium from 'radium';

import {DropPiece} from './DropInterfaces';

export interface CompletedProps {
    dropPiece: DropPiece | undefined;
}

@Radium
export default class CompletedView extends React.Component<CompletedProps, {}> {
    render() {
        return (
            <div style={[styles.completedView, styles.centeredContainer]}>
                <div style={[styles.completedContainer]}>
                    <p style={[styles.completedTitle]}>Completed!</p>
                    { !!this.props.dropPiece && !! this.props.dropPiece.url ?
                        <a href={this.props.dropPiece.url}>Here's your new piece!</a>
                        :
                        null
                    }
                </div>
            </div>
        );
    }
}

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
    }
};
