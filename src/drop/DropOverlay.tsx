import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {StyleRoot} from 'radium';
const Frame = require('react-frame-component');

import DefaultCover from './DefaultCover';
import Toggle from './Toggle';
import styles from './DropOverlayStyles';
import {DropOverlayProps, DropOverlayState, MixStem, File, FileType} from './DropInterfaces';
import {getPieceBytes, getUrls} from './../drop';

export class DropOverlay extends React.Component<DropOverlayProps, DropOverlayState> {
    input: HTMLElement;

    public state: DropOverlayState;

    constructor(props: DropOverlayProps) {
        super(props);
        this.state = {
            title: '',
            titleActive: false,
            description: '',
            descriptionActive: false,
            listed: false,
            coverImageUrlWithFallback: '',
            hasCoverImage: false,
            uploadFiles: []
        };

        getPieceBytes(props.stems, (mixStemsBlob) => {
            let mixStem = { type: FileType.MixStem, data: mixStemsBlob };
            this.pushFile(mixStem);
        });
    }

    pushFile(file: File) {
        if (!this.state.uploadFiles || this.state.uploadFiles.length === 0) {
            let fileArray = new Array<File>();
            fileArray.push(file);
            this.setState({ uploadFiles: fileArray });
        } else {
            let fileArray = this.state.uploadFiles.slice();
            fileArray.push(file);
            this.setState({ uploadFiles: fileArray });
        }
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
            this.setState({
                coverImageUrlWithFallback: reader.result,
                hasCoverImage: true
            });
        };

        reader.readAsDataURL(image);

        const binaryReader  = new FileReader();

        binaryReader.onloadend = () => {
            let coverImage = { type: FileType.CoverImage, data: binaryReader.result.match(/,(.*)$/)[1] };
            this.pushFile(coverImage);
        };

        binaryReader.readAsDataURL(image);
    }

    handleDropClick(e: any): void {
        if (!!this.state.uploadFiles && this.state.uploadFiles.length > 0) {
            getUrls(this.state.uploadFiles.length, (urls) => {
                if (!!this.state.uploadFiles && this.state.uploadFiles.length > 0) {
                    let fileArray = this.state.uploadFiles.slice();
                    fileArray.forEach(function(entry, index) {
                        entry.url = urls[index];
                    });
                    this.setState({ uploadFiles: fileArray });
                }
            });
        }
    }

    handleCloseClick(e: any): void {
        const iframe = document.getElementById('dropIframe');

        if (!iframe) {
            throw new Error('Could not find element');
        }

        const element = iframe.parentElement;

        if (!element) {
            throw new Error('Could not find element');
        }

        ReactDOM.unmountComponentAtNode(element);
    }

    render() {
        const iframeStyles = {
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            border: 0
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
                                { this.state.hasCoverImage ?
                                    <div
                                        style={{
                                                width: '100%',
                                                height: '100%',
                                                background: `url(${this.state.coverImageUrlWithFallback}) center center / cover no-repeat`,
                                            }}
                                    ></div> :
                                    <DefaultCover />

                                }
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
                                        placeholder='Song title'
                                        size={50}
                                        maxLength={50}
                                        onChange={(e) => this.setState({title: (e.target as HTMLInputElement).value})}
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
                                        placeholder='Describe your piece'
                                        maxLength={140}
                                        onChange={(e) => this.setState({description: (e.target as HTMLInputElement).value})}
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
                                        value={!!this.state.listed}
                                        onChange={() => this.setState({listed: !this.state.listed})}
                                    />
                                </p>
                            </div>
                            <div style={[styles.dropPieceButtons]}>
                                <a
                                    href='#'
                                    key='drop'
                                    style={[styles.colorLink, styles.dropLinkButtons, styles.dropDrop]}
                                    onClick={(e) => this.handleDropClick(e)}>Drop</a>

                                <a
                                    href='#'
                                    key='cancel'
                                    style={[styles.colorLink, styles.dropLinkButtons, styles.dropCancel]}
                                    onClick={(e) => this.handleCloseClick(e)}>Cancel</a>
                            </div>
                        </div>
                    </div>
                </StyleRoot>
            </Frame>
        );
    }
}
