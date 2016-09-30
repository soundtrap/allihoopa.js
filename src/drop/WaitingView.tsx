import * as React from 'react';
import * as Radium from 'radium';

export interface WaitingProps {
    progress: number | undefined;
}

@Radium
export default class WaitingView extends React.Component<WaitingProps, {}> {
    render() {
        return (
            <div style={[styles.dropWaitingView, styles.centeredContainer]}>
                Waiting...
            </div>
        );
    }
}

const styles = {
    dropWaitingView: {
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
