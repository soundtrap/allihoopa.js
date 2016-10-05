import * as Radium from 'radium';
import * as React from 'react';

import * as CommonStyles from '../styles/CommonStyles';

export interface WaitingProps {
    progress: number | undefined;
}

@Radium
export class WaitingView extends React.Component<WaitingProps, {}> {
    render() {
        return (
            <div style={[VIEW_STYLE, CommonStyles.CENTERED_CONTAINER_STYLE]}>
                <div style={CONTAINER_STYLE}>
                    <p style={TITLE_STYLE}>Uploading files</p>
                    <p style={PROGRESS_STYLE}>{this.props.progress}%</p>
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
    fontSize: '48px',
    lineHeight: 1.2,
    marginTop: '32px',
    marginBottom: '16px',
};

const PROGRESS_STYLE = {
    fontSize: '48px',
    lineHeight: 1.2,
    marginTop: '32px',
    marginBottom: '16px',
    color: CommonStyles.TURQUOISE_COLOR,
};
