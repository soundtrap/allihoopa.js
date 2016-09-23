import * as React from 'react';
import {StyleRoot} from 'radium';
const Frame = require('react-frame-component');

export interface DropOverlayProps { compiler: string; framework: string; }

export class DropOverlay extends React.Component<DropOverlayProps, {}> {
    render() {
        const iframeStyles = {
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '0',
            left: '0',
            border: '0'
        };
        return (
            <Frame style={iframeStyles}>
                <StyleRoot>
                    <div style={[styles.dropOverlay]}>
                        <div style={[styles.dropContainer]}>
                            <h1>Hello from an iframe {this.props.compiler} and {this.props.framework}!</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                    </div>
                </StyleRoot>
            </Frame>
        );
    }
}

const styles = {
    dropOverlay: {
        background: '#fff',
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dropContainer: {
        background: '#fed3ff',
        textAlign: 'center',
        maxWidth: '460px',
        width: '100%',
        maxHeight: '660px',
        height: '100%',
        overflow: 'scroll',
        fontFamily: '-apple-system, ".SFNSText-Regular", "San Francisco", Roboto, "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif',
        '@media (max-width: 768px)': {
            maxWidth: '100%'
        }
    }
};
