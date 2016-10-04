import * as React from 'react';
import {StyleRoot} from 'radium';
import * as CommonStyles from './CommonStyles';

const Frame = require('react-frame-component');

export class Overlay extends React.Component<void, void> {
    render() {
        return (
            <Frame style={IFRAME_STYLE}>
                <StyleRoot>
                    <div style={[OVERLAY_STYLE, CommonStyles.CENTERED_CONTAINER_STYLE]}>
                        <div style={CONTAINER_STYLE}>
                            {this.props.children}
                        </div>
                    </div>
                </StyleRoot>
            </Frame>
        );
    }
}

const IFRAME_STYLE = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    border: 0,
};

const OVERLAY_STYLE = {
    background: '#fff',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
};

const CONTAINER_STYLE = {
    background: '#fff',
    textAlign: 'left',
    maxWidth: '460px',
    width: '100%',
    maxHeight: '660px',
    height: '100%',
    overflow: 'scroll',
    padding: '10px',
    fontFamily: '-apple-system, ".SFNSText-Regular", "San Francisco", Roboto, "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif',
    '@media (max-width: 768px)': {
        maxWidth: '100%'
    },
};
