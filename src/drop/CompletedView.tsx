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
            <div style={[styles.dropCompletedView, styles.centeredContainer]}>
                <div>
                    <p>Completed!</p>
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
    dropCompletedView: {
        width: '100%',
        height: '100%'
    },
    centeredContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
};
