import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {StyleRoot} from 'radium';
const Frame = require('react-frame-component');

import DefaultCover from './DefaultCover';
import Toggle from './Toggle';
import WaitingView from './WaitingView';
import CompletedView from './CompletedView';
import ErrorView from './ErrorView';

import {styles} from './DropOverlayStyles';
import {commonStyles} from './commonStyles';
import {DropOverlayState, PieceInput, DropPiece, UploadStatus, UploadProgress, Status} from './DropInterfaces';
import {getFileAsBytes, uploadResource, dropPiece} from './dropAPI';

export class DropOverlay extends React.Component<PieceInput, DropOverlayState> {
    input: HTMLElement;
    piece: PieceInput;
    uploadStatus: UploadStatus = {};
    uploadProgress: UploadProgress = {};
    public state: DropOverlayState;

    constructor(props: PieceInput) {
        super(props);

        this.state = {
            title: props.presentation.title,
            titleActive: false,
            description: props.presentation.description,
            descriptionActive: false,
            isListed: false,
            coverImageUrlWithFallback: '',
            hasCoverImage: false,
            coverImageData: '',
            dropPiece: {uuid: '', url: '', shortId: ''},
            status: Status.MAIN,
            uploadProgress: 0,
            errorMessage: ''
        };

        // Todo: valide input props
        this.piece = this.props;

        this.uploadStatus['mixStem'] = false;

        // upload mixStem
        if (!!props.stems.mixStem.wav) {
            this.initiateFileUpload(props.stems.mixStem.wav, (targetUrl: string) => {
                this.piece.stems.mixStem.wav = targetUrl;
                this.uploadStatus['mixStem'] = true;
            });
        } else if (!!props.stems.mixStem.ogg) {
            this.initiateFileUpload(props.stems.mixStem.ogg, (targetUrl: string) => {
                this.piece.stems.mixStem.ogg = targetUrl;
                this.uploadStatus['mixStem'] = true;
            });
        }
        // upload presentation
        if (!!props.presentation.preview) {
            this.uploadStatus['preview'] = false;

            if (!!props.presentation.preview.wav) {
                this.initiateFileUpload(props.presentation.preview.wav, (targetUrl: string) => {
                    this.piece.presentation.preview.wav = targetUrl;
                    this.uploadStatus['preview'] = true;
                });
            } else if (!!props.presentation.preview.ogg) {
                this.initiateFileUpload(props.presentation.preview.ogg, (targetUrl: string) => {
                    this.piece.presentation.preview.ogg = targetUrl;
                    this.uploadStatus['preview'] = true;
                });
            }
        }
    }

    initiateFileUpload(url: string, callback: any) {
        getFileAsBytes(url, (data) => {
            uploadResource(
                data,
                (targetUrl: string) => {
                    callback(targetUrl);
                    this.uploadStatus['mixStem'] = true;
                },
                (progress: number) => {
                    this.uploadProgress['mixStem'] = progress;
                }
            );
        });
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
            if (reader.result.indexOf('image/png') !== -1) {
                this.setState({
                    coverImageUrlWithFallback: reader.result,
                    hasCoverImage: true
                });

                // then load the data
                const binaryReader  = new FileReader();

                binaryReader.onloadend = () => {
                    this.setState({
                        coverImageData: binaryReader.result.match(/,(.*)$/)[1]
                    });
                };

                binaryReader.readAsDataURL(image);
            } else {
                throw new Error('Only supported filetype is PNG');
            }
        };

        reader.readAsDataURL(image);
    }

    waitUploadees(callback: any) {
        this.setState({
            status: Status.WAITING
        });

        let isReady: boolean = true;
        let numOfUploads = 0;
        let sumOfProgress = 0;

        for (const key in this.uploadStatus) {
            const value = this.uploadStatus[key];
            // found unfinished upload
            if (!value) {
                isReady = false;
            }
        }

        for (const key in this.uploadProgress) {
            const value = this.uploadProgress[key];
            numOfUploads++;
            sumOfProgress += value;
        }

        this.setState({
            uploadProgress: Math.round(sumOfProgress / numOfUploads)
        });

        if (!isReady) {
            const self = this;
            setTimeout(function() {
                self.waitUploadees(callback);
            }, 1000);
        } else {
            callback();
            this.setState({
                status: Status.COMPLETED
            });
        }
    }

    handleDropClick(e: any): void {
        // Todo: validation
        this.piece.presentation.title = ( !!this.state.title ? this.state.title : this.piece.presentation.title );
        this.piece.presentation.description = ( !!this.state.description ? this.state.description : this.piece.presentation.description );
        this.piece.presentation.isListed = ( !!this.state.isListed ? true : false );

        if (!!this.piece.presentation.coverImage) {
            // Todo: handle different cases if the cover came from props, is default or was uploaded
            this.uploadStatus['coverImage'] = false;
            uploadResource(
                this.state.coverImageData,
                (targetUrl: string) => {
                    this.piece.presentation.coverImage = { png: targetUrl };
                    this.uploadStatus['coverImage'] = true;
                },
                (progress) => {
                    this.uploadProgress['coverImage'] = progress;
                }
            );
        }

        this.waitUploadees(() => {
            dropPiece(this.piece, (dropPiece: DropPiece) => {
                if (dropPiece) {
                    this.setState({
                        dropPiece: dropPiece
                    });
                }
            });
        });
    }

    handleCloseClick(): void {
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
                    <div style={[styles.dropOverlay, commonStyles.centeredContainer]}>
                        <div style={[styles.dropContainer]}>
                            <div style={{display: this.state.status === Status.MAIN ? 'block' : 'none'}}>
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
                                            onBlur={() => this.setState({titleActive: false})}
                                            value={this.state.title} />
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
                                            onBlur={() => this.setState({descriptionActive: false})}
                                            value={this.state.description} />
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <span style={[styles.dropPieceVisibility]}>Visibility</span>
                                        <Toggle
                                            enabledTitle='Listed'
                                            disabledTitle='Unlisted'
                                            value={!!this.state.isListed}
                                            onChange={() => this.setState({isListed: !this.state.isListed})}
                                        />
                                    </p>
                                </div>
                                <div style={[styles.dropPieceButtons]}>
                                    <button
                                        key='drop'
                                        style={[styles.colorLink, styles.dropLinkButtons, styles.dropDrop, commonStyles.resetButton]}
                                        onClick={(e) => this.handleDropClick(e)}
                                        disabled={!this.state.title || this.state.title.length <= 0}>Drop</button>

                                    <button
                                        key='cancel'
                                        style={[styles.colorLink, styles.dropLinkButtons, styles.dropCancel, commonStyles.resetButton]}
                                        onClick={() => this.handleCloseClick()}>Cancel</button>
                                </div>
                            </div>
                            { this.state.status === Status.WAITING ?
                                <WaitingView
                                    progress={this.state.uploadProgress}
                                /> : null }
                            { this.state.status === Status.COMPLETED ?
                                <CompletedView
                                    dropPiece={this.state.dropPiece}
                                    closeFunction={this.handleCloseClick}
                                /> : null }
                            { this.state.status === Status.ERROR ?
                                <ErrorView
                                    errorMessage={this.state.errorMessage}
                                /> : null }
                        </div>
                    </div>
                </StyleRoot>
            </Frame>
        );
    }
}
