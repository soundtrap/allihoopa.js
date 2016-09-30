import * as React from 'react';
import * as Radium from 'radium';

export interface WaitingProps {
    progress: number | undefined;
}

@Radium
export default class WaitingView extends React.Component<WaitingProps, {}> {
    render() {
        return (
            <div style={[styles.waitingView, styles.centeredContainer]}>
                <div style={[styles.waitingContainer]}>
                    <p style={[styles.waitingTitle]}>Uploading files</p>
                    <p style={[styles.waitingProgress]}>{this.props.progress}%</p>
                </div>
            </div>
        );
    }
}

const turquoise = '#23a6bd';

const styles = {
    waitingView: {
        width: '100%',
        height: '100%'
    },
    centeredContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    waitingContainer: {
        textAlign: 'center'
    },
    waitingTitle: {
        fontSize: '48px',
        lineHeight: 1.2,
        marginTop: '32px',
        marginBottom: '16px'
    },
    waitingProgress: {
        fontSize: '48px',
        lineHeight: 1.2,
        marginTop: '32px',
        marginBottom: '16px',
        color: turquoise
    }
};
