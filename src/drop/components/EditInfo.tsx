import * as Radium from 'radium';
import * as React from 'react';

import * as CommonStyles from '../styles/CommonStyles';

import {Title} from './edit-info/Title';
import {DefaultCover} from './DefaultCover';
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

                {this.renderCoverImageEditor()}
                {this.renderTitleEditor()}
                {this.renderDescriptionEditor()}
                {this.renderVisibilityEditor()}
                {this.renderButtons()}
            </div>
        );
    }

    private renderCoverImageEditor(): JSX.Element {
        return (
            <div>
                <p style={COVER_LABEL_STYLE}>Cover Image</p>

                <div style={COVER_CONTAINER_STYLE}>
                    { this.state.coverImageDataURL ?
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                background: `url(${this.state.coverImageDataURL}) center center / cover no-repeat`,
                            }}
                        ></div> :
                        <DefaultCover />
                    }
                </div>

                <a
                    href='#'
                    style={[COLOR_LINK_STYLE, COVER_IMAGE_CHANGE_STYLE]}
                    onClick={(e) => this.handleOpenFileBrowser(e)}
                    onTouchEnd={(e) => this.handleOpenFileBrowser(e)}
                >
                    Upload
                </a>

                <input
                    type='file'
                    accept='image/png'
                    ref={input => { this.imageInput = input; }}
                    style={{display: 'none'}}
                    value=''
                    onChange={e => this.handleImageInput(e)} />
            </div>
        );
    }

    private renderTitleEditor(): JSX.Element {
        return (
            <div style={PIECE_TITLE_STYLE}>
                <p>
                    <label
                        style={[CONTROL_LABEL]}
                    >
                        Title
                    </label><br />
                    <input
                        style={[PIECE_TITLE_INPUT_STYLE, FORM_CONTROL_STYLE]}
                        key='title'
                        placeholder='Song title'
                        size={50}
                        maxLength={50}
                        onChange={(e) => this.setState({title: (e.target as HTMLInputElement).value} as EditInfoState)}
                        value={this.state.title}
                    />
                </p>
            </div>
        );
    }

    private renderDescriptionEditor(): JSX.Element {
        const charactersLeft = 140 - this.state.description.length;
        return (
            <div style={[DESCRIPTION_STYLE]}>
                <p>
                    <label
                        style={[CONTROL_LABEL]}
                    >
                        Description
                    </label>
                    <span style={[CHARACTER_COUNT_STYLE]}>{charactersLeft}</span>

                    <textarea
                        style={[DESCRIPTION_TEXTAREA_STYLE, FORM_CONTROL_STYLE]}
                        key='description'
                        placeholder='Describe your piece'
                        maxLength={140}
                        onChange={(e) => this.setState({description: (e.target as HTMLInputElement).value} as EditInfoState)}
                        value={this.state.description} />
                </p>
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


    private handleImageInput(e: React.FormEvent): void {
        const files = (e.target as HTMLInputElement).files;
        if (!files) {
            return;
        }

        const image = files[0];
        if (!image) {
            return;
        }

        this.fetchCoverImage(image);
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


    private handleOpenFileBrowser(e: React.SyntheticEvent): void {
        e.preventDefault();

        const coverImageInput = this.imageInput;

        if (!coverImageInput) {
            throw new Error('Could not find element');
        }

        coverImageInput.click();
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

const COVER_LABEL_STYLE = {
    margin: '16px 0 4px 0',
};

const COVER_CONTAINER_STYLE = {
    width: '117px',
    height: '117px',
    position: 'relative',
    display: 'inline-block',
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.1)',
};

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

const COVER_IMAGE_CHANGE_STYLE = {
    verticalAlign: 'bottom',
    marginLeft: '18px',
    textTransform: 'uppercase',
    fontSize: '14px',
};

const PIECE_TITLE_STYLE = {
    marginTop: '12px',
    display: 'block',
    width: '100%',
    marginBottom: '16px',
    position: 'relative',
};

const CONTROL_LABEL = {
    color: CommonStyles.DUSTY_GRAY_COLOR,
    fontSize: '14px',
};

const PIECE_TITLE_INPUT_STYLE = {
    padding: '12px',
};

const FORM_CONTROL_STYLE = {
    display: 'block',
    padding: '14px',
    borderRadius: 0,
    fontSize: '16px',
    color: CommonStyles.MASALA_COLOR,
    border: '1px solid #CCC',
    width: 'calc(100% - 26px)',
    WebkitAppearance: 'none',
    ':focus': {
        boxShadow: 'none',
        outline: 'none',
        border: `1px solid ${CommonStyles.TURQUOISE_COLOR}`,
        background: 'rgba(74, 74, 74, 0.03)',
    },
};

const DESCRIPTION_STYLE = {
    display: 'block',
    width: '100%',
    marginBottom: '16px',
    position: 'relative',
};
const CHARACTER_COUNT_STYLE = {
    fontSize: '12px',
    float: 'right',
};

const DESCRIPTION_TEXTAREA_STYLE = {
    resize: 'vertical',
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
