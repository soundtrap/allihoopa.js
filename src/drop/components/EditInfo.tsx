import * as Radium from 'radium';
import * as React from 'react';

import * as CommonStyles from '../styles/CommonStyles';

import {DataEntry} from './edit-info/DataEntry';
import {Title} from './edit-info/Title';
import {Toggle} from './Toggle';


export interface EditInfoState {
    title: string;
    description: string;
    listed: boolean;
    coverImageDataURL: string | null;
    coverImageBinary: Blob | null;
}

export interface EditInfoProps {
    initialTitle: string;
    initialCoverImageBinary: Blob | null;
    onCommit: (info: EditInfoState) => void;
    onCancel: () => void;
}


@Radium
export class EditInfo extends React.Component<EditInfoProps, EditInfoState> {
    imageInput: HTMLInputElement;

    constructor(props: EditInfoProps) {
        super(props);

        this.state = {
            title: props.initialTitle,
            description: '',
            listed: true,
            coverImageDataURL: null,
            coverImageBinary: null,
        };

        if (props.initialCoverImageBinary) {
            this.fetchCoverImage(props.initialCoverImageBinary);
        }
    }

    componentWillReceiveProps(nextProps: EditInfoProps) {
        if (!this.state.coverImageBinary && nextProps.initialCoverImageBinary) {
            this.fetchCoverImage(nextProps.initialCoverImageBinary);
        }
    }

    render(): JSX.Element {
        return (
            <div>
                <Title />

                <DataEntry
                    title={this.state.title}
                    description={this.state.description}
                    coverImageDataURL={this.state.coverImageDataURL}

                    onTitleChange={title => this.setState({title} as EditInfoState)}
                    onDescriptionChange={description => this.setState({description} as EditInfoState)}
                    onCoverImageChange={image => this.fetchCoverImage(image)}
                />

                {this.renderVisibilityEditor()}
                {this.renderButtons()}
            </div>
        );
    }

    private renderVisibilityEditor(): JSX.Element {
        return (
            <div>
                <p>
                    <span style={[VISIBILITY_STYLE]}>Visibility</span>
                    <Toggle
                        enabledTitle='Listed'
                        disabledTitle='Unlisted'
                        value={this.state.listed}
                        onChange={() => this.setState({listed: !this.state.listed} as EditInfoState)}
                    />
                </p>
            </div>
        );
    }

    private renderButtons(): JSX.Element {
        return (
            <div style={BUTTONS_STYLE}>
                <button
                    key='drop'
                    style={[COLOR_LINK_STYLE, LINK_BUTTONS_STYLE, DROP_BUTTON_STYLE, CommonStyles.RESET_BUTTON_STYLE]}
                    onClick={e => this.handleDropClick(e)}
                    disabled={!this.state.title || this.state.title.length <= 0}>Drop</button>

                <button
                    key='cancel'
                    style={[COLOR_LINK_STYLE, LINK_BUTTONS_STYLE, CANCEL_BUTTON_STYLE, CommonStyles.RESET_BUTTON_STYLE]}
                    onClick={e => this.handleCloseClick(e)}>Cancel</button>
            </div>
        );
    }


    private fetchCoverImage(image: Blob) {
        const dataURLReader = new FileReader();

        dataURLReader.onloadend = () => {
            this.setState({
                coverImageBinary: image,
                coverImageDataURL: dataURLReader.result,
            } as EditInfoState);
        };

        dataURLReader.readAsDataURL(image);
    }


    private handleDropClick(e: React.SyntheticEvent): void {
        e.preventDefault();

        this.props.onCommit(this.state);
    }

    private handleCloseClick(e: React.SyntheticEvent): void {
        e.preventDefault();

        this.props.onCancel();
    }
}

const COLOR_LINK_STYLE = {
    color: CommonStyles.TURQUOISE_COLOR,
    textDecoration: 'none',
    ':visited': {
        color: CommonStyles.TURQUOISE_COLOR,
    },
    ':hover': {
        color: CommonStyles.LINK_HOVER_COLOR,
    },
    ':active': {
        color: CommonStyles.LINK_HOVER_COLOR,
    },
};

const VISIBILITY_STYLE = {
    display: 'inline-block',
    verticalAlign: 'top',
    marginRight: '8px',
    marginBottom: '16px',
};

const BUTTONS_STYLE = {
    fontSize: '16px',
    display: 'block',
    marginTop: '16px',
    borderTop: '1px solid rgba(74, 74, 74, 0.1)',
    padding: '12px 8px 40px',
    '@media (min-width: 768px)': {
        height: '52px',
        padding: '12px 8px 12px 16px',
    },
};

const LINK_BUTTONS_STYLE = {
    float: 'right',
    marginTop: '3px',
    textTransform: 'uppercase',
    fontSize: '14px',
    ':hover': {
        cursor: 'pointer',
    },
    ':disabled': {
        color: CommonStyles.DUSTY_GRAY_COLOR,
    },
};

const CANCEL_BUTTON_STYLE = {
    marginRight: '26px',
};

const DROP_BUTTON_STYLE = {
    marginLeft: '2px',
    '@media (max-width: 768px)': {
        marginLeft: '20px',
    },
};
