import * as React from 'react';
import * as Radium from 'radium';

import * as CommonStyles from '../styles/CommonStyles';

export interface ErrorProps {
    errorMessage: string | undefined;
}

@Radium
export class ErrorView extends React.Component<ErrorProps, {}> {
    render() {
        return (
            <div style={[VIEW_STYLE, CommonStyles.CENTERED_CONTAINER_STYLE]}>
                Error :(
            </div>
        );
    }
}

const VIEW_STYLE = {
    width: '100%',
    height: '100%'
};
