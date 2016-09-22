import * as React from 'react';
import * as Radium from 'radium';
const Frame = require('react-frame-component');

export interface DropWindowProps { compiler: string; framework: string; }

@Radium
export class DropWindow extends React.Component<DropWindowProps, {}> {
    render() {
        const iframeStyles = {
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '0',
            left: '0',
            border: '0'
        };
        return  <Frame style={iframeStyles}>
                    <div style={[styles.dropContainer]}>
                        <h1>Hello from an iframe {this.props.compiler} and {this.props.framework}!</h1>
                    </div>
                </Frame>;
    }
}

const styles = {
    dropContainer: {
        background: '#fed3ff',
        textAlign: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        fontFamily: '-apple-system, ".SFNSText-Regular", "San Francisco", Roboto, "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif'
    }
};
