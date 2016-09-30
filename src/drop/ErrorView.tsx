import * as React from 'react';
import * as Radium from 'radium';

export interface ErrorProps {
    errorMessage: string | undefined;
}

@Radium
export default class ErrorView extends React.Component<ErrorProps, {}> {
    render() {
        return (
            <div style={[styles.dropErrorView, styles.centeredContainer]}>
                Error :(
            </div>
        );
    }
}

const styles = {
    dropErrorView: {
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
