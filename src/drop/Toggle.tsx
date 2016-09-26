import * as React from 'react';

export default class Toggle extends React.Component<{}, {}> {

    render() {
        let title: string = '';
        let iconClass: string = '';
        let spanClass: string = '';

        if (this.props.value) {
            title = this.props.enabledTitle;
            iconClass = 'fa fa-toggle-on fa-2x fa-fw';
            spanClass = 'toggle-button enabled';
        } else {
            title = this.props.disabledTitle;
            iconClass = 'fa fa-toggle-off fa-2x fa-fw';
            spanClass = 'toggle-button';
        }

        return (
            <span className={spanClass}>
                <i className={iconClass} onClick={this.props.onChange} />
                <span>{title}</span>
            </span>

        );
    }
});