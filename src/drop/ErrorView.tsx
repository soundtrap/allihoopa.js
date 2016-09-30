import * as React from 'react';
import * as Radium from 'radium';

import {commonStyles} from './commonStyles';

export interface ErrorProps {
    errorMessage: string | undefined;
}

@Radium
export default class ErrorView extends React.Component<ErrorProps, {}> {
    render() {
        return (
            <div style={[styles.dropErrorView, commonStyles.centeredContainer]}>
                Error :(
            </div>
        );
    }
}

const styles = {
    dropErrorView: {
        width: '100%',
        height: '100%'
    }
};
