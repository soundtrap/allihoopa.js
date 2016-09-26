import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {StyleRoot} from 'radium';
const Frame = require('react-frame-component');

import DefaultCover from './defaultCover';
import Toggle from './Toggle';

export interface DropOverlayProps { compiler: string; framework: string; }

export interface DropOverlayState {
    title: string;
    titleActive: boolean;
    description: string;
    descriptionActive: boolean;
    listed: boolean;
}

export class DropOverlay extends React.Component<DropOverlayProps, DropOverlayState> {
    input: HTMLElement;
    coverImageUrlWithFallback: string;
    hasCoverImage: boolean;
    coverImageData: any;
    description: string;
    title: string;

    public state: DropOverlayState;

    constructor(props: DropOverlayProps) {
        super(props);
        this.state = {
            title: '',
            titleActive: false,
            description: '',
            descriptionActive: false,
            listed: false
        };
    }

    openFileBrowser(e: any): void {
        e.preventDefault();

        const coverImageInput = this.input;

        if (!coverImageInput) {
            throw new Error('Could not find element');
        }

        coverImageInput.click();
    }

    handleImageInput(e: any): void {
        const image = e.target.files[0];
        if (!image) {
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            this.coverImageUrlWithFallback = reader.result;
            this.hasCoverImage = true;
        };

        reader.readAsDataURL(image);

        const binaryReader  = new FileReader();

        binaryReader.onloadend = () => {
            this.coverImageData = binaryReader.result.match(/,(.*)$/)[1];
        };

        binaryReader.readAsDataURL(image);
    }

    render() {
        const iframeStyles = {
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '0',
            left: '0',
            border: '0'
        };

        let charactersLeft = 140;
        if (this.state.description) {
            charactersLeft = 140 - this.state.description.length;
        }

        return (
            <Frame id='dropIframe' style={iframeStyles}>
                <StyleRoot>
                    <div style={[styles.dropOverlay]}>
                        <div style={[styles.dropContainer]}>
                            <h3 style={[styles.dropHeading]}>Drop to Allihoopa</h3>
                            <p style={[styles.dropCoverLabel]}>Cover Image</p>
                            <div style={[styles.dropCoverContainer]}>
                                <DefaultCover />
                            </div>
                            <a
                                href='#'
                                style={[styles.colorLink, styles.dropCoverImageChange]}
                                onClick={(e) => this.openFileBrowser(e)}
                                onTouchEnd={(e) => this.openFileBrowser(e)}>
                                Upload
                            </a>
                            <input
                                type='file'
                                ref={(input) => { this.input = input; }}
                                id='coverImageInput'
                                style={[styles.dropCoverImageInput]}
                                value=''
                                onChange={(e) => this.handleImageInput(e)} />

                            <div style={[styles.dropPieceTitle]}>
                                <p>
                                    <label
                                        htmlFor='title'
                                        style={[
                                            styles.dropControlLabel,
                                             this.state.titleActive && styles.active
                                        ]}
                                    >
                                        Title
                                    </label><br />
                                    <input
                                        style={[styles.dropPieceTitleInput, styles.dropFormControl]}
                                        name='title'
                                        id='title'
                                        key='title'
                                        ref={(title) => { this.title = title; }}
                                        placeholder='Song title'
                                        size='50'
                                        maxLength='50'
                                        onChange={(e) => this.setState({title: e.target.value})}
                                        onFocus={() => this.setState({titleActive: true})}
                                        onBlur={() => this.setState({titleActive: false})} />
                                </p>
                            </div>

                            <div style={[styles.dropPieceDescription]}>
                               <p>
                                    <label
                                        htmlFor='description'
                                        style={[
                                            styles.dropControlLabel,
                                            this.state.descriptionActive && styles.active]}
                                    >
                                        Description
                                    </label>
                                    <span style={[styles.dropCharacterCount]}>{charactersLeft}</span>

                                    <textarea
                                        style={[styles.dropPieceDescriptionTextarea, styles.dropFormControl]}
                                        name='description'
                                        id='description'
                                        key='description'
                                        ref={(description) => { this.description = description; }}
                                        placeholder='Describe your piece'
                                        maxLength='140'
                                        onChange={(e) => this.setState({description: e.target.value})}
                                        onFocus={() => this.setState({descriptionActive: true})}
                                        onBlur={() => this.setState({descriptionActive: false})} />
                                </p>
                            </div>
                            <div>
                                <p>
                                    <span style={[styles.dropPieceVisibility]}>Visibility</span>
                                    <Toggle
                                        enabledTitle='Listed'
                                        disabledTitle='Unlisted'
                                        value={this.state.listed}
                                        onChange={() => this.setState({listed: !this.state.listed})}
                                    />
                                </p>
                            </div>
                            <div style={[styles.dropPieceButtons]}>
                                <a
                                    href='#'
                                    key='save'
                                    style={[styles.colorLink, styles.dropLinkButtons, styles.dropSave]}
                                    onClick={this.handleSaveClick}>Save</a>

                                <a
                                    href='#'
                                    key='cancel'
                                    style={[styles.colorLink, styles.dropLinkButtons, styles.dropCancel]}
                                    onClick={this.handleCloseClick}>Cancel</a>
                            </div>
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
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dropContainer: {
        background: '#eee',
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
        }
    },
    dropHeading: {
        fontSize: '22px',
        lineHeight: 1.2,
        marginTop: '32px',
        marginBottom: '16px'
    },
    dropCoverLabel: {
        margin: '16px 0 4px 0'
    },
    dropCoverContainer: {
        width: '117px',
        height: '117px',
        position: 'relative',
        display: 'inline-block',
        boxShadow: '0 0 4px rgba(0, 0, 0, 0.1)'
    },
    dropCoverImage: {
        width: '100%',
        height: '100%'
    },
    colorLink: {
        color: '#7eccd9',
        ':visited': {
            color: '#7eccd9'
        },
        ':hover': {
            color: '#63a2ac'
        },
        ':active': {
            color: '#63a2ac'
        }
    },
    dropCoverImageChange: {
        verticalAlign: 'bottom',
        marginLeft: '18px',
        textTransform: 'uppercase',
        fontSize: '14px'
    },
    dropCoverImageInput: {
        display: 'none'
    },
    dropPieceTitle: {
        marginTop: '12px',
        display: 'block',
        width: '100%',
        marginBottom: '16px',
        position: 'relative'
    },
    dropControlLabel: {
        color: '#9B9B9B',
        fontSize: '14px'
    },
    active: {
        color: '#7eccd9'
    },
    dropPieceTitleInput: {
        fontSize: '14px',
        color: '#4A4A4A',
        padding: '12px',
        ':focus': {
            background: 'rgba(#4A4A4A, 0.03)',
            boxShadow: 'none'
        }
    },
    dropFormControl: {
        display: 'block',
        padding: '12px',
        borderRadius: 0,
        fontSize: '16px',
        border: '1px solid #CCC',
        width: 'calc(100% - 26px)',
        WebkitAppearance: 'none',
        ':focus': {
            border: '1px solid #7eccd9'
        }
    },
    dropPieceDescription: {
        display: 'block',
        width: '100%',
        marginBottom: '16px',
        position: 'relative'
    },
    dropCharacterCount: {
        fontSize: '12px',
        float: 'right'
    },
    dropPieceDescriptionTextarea: {
        fontSize: '14px',
        color: '#4A4A4A',
        padding: '12px',
        height: 'auto',
        border: '1px solid #CCC',
        ':focus': {
            background: 'rgba(#4A4A4A, 0.03)',
            boxShadow: 'none'
        }
    },
    dropPieceVisibility: {
        display: 'inline-block',
        verticalAlign: 'top',
        marginRight: '8px',
        marginBottom: '16px'
    },
    dropPieceButtons: {
        fontSize: '16px',
        display: 'block',
        marginTop: '16px',
        borderTop: '1px solid rgba(74, 74, 74, 0.1)',
        padding: '12px 8px 40px',
        '@media (min-width: 768px)': {
            height: '52px',
            padding: '12px 8px 12px 16px'
        }
    },
    dropLinkButtons: {
        float: 'right',
        marginTop: '3px',
        textTransform: 'uppercase',
        fontSize: '14px'
    },
    dropCancel: {
        marginRight: '26px'
    },
    dropSave: {
        marginLeft: '2px',
        '@media (max-width: 768px)': {
            marginLeft: '20px'
        }
    }
};
