import * as React from 'react';

import {EditInfo, EditInfoState} from './EditInfo';
import {WaitingView} from './WaitingView';
import {CompletedView} from './CompletedView';
import {DropPiece} from '../PieceData';
import {PieceInput, CreatedPiece, AudioResourceInput, ImageResourceInput} from '../DropInterfaces';

import * as DropAPI from '../DropAPI';
import {Result} from '../../graphql';

export type AudioAssetType = 'ogg' | 'wav';
export type ImageAssetType = 'png';

export type AssetState<T>
    = { state: 'NO_ASSET' }
    | { state: 'ERROR', error: Error }
    | { state: 'WAITING' }
    | { state: 'DONE', url: string, asset_type: T };

export interface CoordinatorState {
    isEditingCommitted: boolean;
    isUploading: boolean;
    isUploadCompleted: boolean;
    committedEditorState: EditInfoState | null;

    mixStemState: AssetState<AudioAssetType>;
    previewAudioState: AssetState<AudioAssetType>;
    coverImageState: AssetState<ImageAssetType>;

    initialCoverImage: Blob | null;

    createPieceResult: Result<CreatedPiece> | null;
}

export interface CoordinatorProps {
    input: DropPiece;
    onClose: () => void;
}

export class Coordinator extends React.Component<CoordinatorProps, CoordinatorState> {
    isCanceled: boolean;

    constructor(props: CoordinatorProps) {
        super(props);

        this.isCanceled = false;

        let previewAudioState: AssetState<AudioAssetType> = { state: 'NO_ASSET' };

        if (props.input.presentation.preview) {
            previewAudioState = { state: 'WAITING' };
        }

        this.state = {
            isEditingCommitted: false,
            isUploading: false,
            isUploadCompleted: false,
            committedEditorState: null,
            mixStemState: { state: 'WAITING' },
            previewAudioState: previewAudioState,
            coverImageState: { state: 'WAITING' },
            initialCoverImage: null,
            createPieceResult: null,
        };
    }

    componentDidMount() {
        this.fetchMixStem();

        if (this.state.previewAudioState.state === 'WAITING') {
            this.fetchPreviewAudio();
        }

        if (this.props.input.presentation.coverImage) {
            this.fetchInitialCoverImage();
        }
    }

    componentWillUnmount() {
        this.isCanceled = true;
    }

    componentDidUpdate(prevProps: CoordinatorProps, prevState: CoordinatorState) {
        if (shouldCreatePiece(prevState, this.state)) {
            this.createPiece();
        }
    }

    render(): JSX.Element {
        if (!this.state.isEditingCommitted) {
            return <EditInfo
                initialTitle={this.props.input.presentation.title}
                initialCoverImageBinary={this.state.initialCoverImage}
                onCommit={s => this.handleEditInfoCommit(s)}
                onCancel={() => this.handleEditInfoCancel()}
            />;
        }
        else if (!this.state.isUploadCompleted) {
            return <WaitingView progress={0} />;
        }
        else {
            return <CompletedView closeFunction={() => {}} dropPiece={undefined} />;
        }
    }


    private handleEditInfoCommit(info: EditInfoState) {
        this.setState({
            isEditingCommitted: true,
            committedEditorState: info,
        } as CoordinatorState);

        if (info.coverImageBinary) {
            this.setState({
                coverImageState: { state: 'WAITING' },
            } as CoordinatorState);

            this.uploadCoverImage(info.coverImageBinary);
        }
        else {
            this.setState({
                coverImageState: { state: 'NO_ASSET' },
            } as CoordinatorState);
        }
    }

    private handleEditInfoCancel() {
        this.props.onClose();
    }


    private fetchMixStem() {
        this.props.input.stems.mixStem(
            (audio, error) => this.mixStemDidArrive(audio, error));
    }

    private mixStemDidArrive(audio: Blob | null, error: Error | null) {
        if (this.isCanceled) {
            return;
        }

        if (audio) {
            DropAPI.uploadResource(
                audio,
                result => {
                    if (this.isCanceled) {
                        return;
                    }

                    if (result.status === 'OK') {
                        this.setState({
                            mixStemState: { state: 'DONE', url: result.data, asset_type: mimeToAudioAssetType(audio.type) },
                        } as CoordinatorState);
                    }
                    else {
                        this.setState({
                            mixStemState: { state: 'ERROR', error: result.error },
                        } as CoordinatorState);
                    }
                },
                progress => { });
        }
        else if (error) {
            this.setState({
                mixStemState: { state: 'ERROR', error: error },
            } as CoordinatorState);
        }
        else {
            console.error('Allihoopa SDK, incorrect usage: neither a mix stem nor an error was produced');
        }
    }

    private fetchPreviewAudio() {
        if (this.props.input.presentation.preview) {
            this.props.input.presentation.preview(
                (audio, error) => this.previewAudioDidArrive(audio, error));
        }
    }

    private previewAudioDidArrive(audio: Blob | null, error: Error | null) {
        if (this.isCanceled) {
            return;
        }

        if (audio) {
            DropAPI.uploadResource(
                audio,
                result => {
                    if (this.isCanceled) {
                        return;
                    }

                    if (result.status === 'OK') {
                        this.setState({
                            previewAudioState: { state: 'DONE', url: result.data, asset_type: mimeToAudioAssetType(audio.type) },
                        } as CoordinatorState);
                    }
                    else {
                        this.setState({
                            previewAudioState: { state: 'ERROR', error: result.error },
                        } as CoordinatorState);
                    }
                },
                progress => { });
        }
        else if (error) {
            this.setState({
                previewAudioState: { state: 'ERROR', error: error },
            } as CoordinatorState);
        }
        else {
            this.setState({
                previewAudioState: { state: 'NO_ASSET' },
            } as CoordinatorState);
        }
    }

    private fetchInitialCoverImage() {
        if (this.props.input.presentation.coverImage) {
            this.props.input.presentation.coverImage(
                (image, error) => this.initialCoverImageDidArrive(image, error));
        }
    }

    private initialCoverImageDidArrive(image: Blob | null, error: Error | null) {
        if (this.isCanceled) {
            return;
        }

        if (!error) {
            this.setState({
                initialCoverImage: image,
            } as CoordinatorState);
        }
        else {
            this.setState({
                coverImageState: { state: 'ERROR', error: error },
            } as CoordinatorState);
        }
    }

    private uploadCoverImage(data: Blob) {
        if (this.isCanceled) {
            return;
        }

        DropAPI.uploadResource(
            data,
            result => {
                if (this.isCanceled) {
                    return;
                }

                if (result.status === 'OK') {
                    this.setState({
                        coverImageState: { state: 'DONE', url: result.data, asset_type: mimeToImageAssetType(data.type) },
                    } as CoordinatorState);
                }
                else {
                    this.setState({
                        coverImageState: { state: 'ERROR', error: result.error },
                    } as CoordinatorState);
                }
            },
            progress => {});
    }

    private createPiece() {
        if (this.state.mixStemState.state !== 'DONE') {
            throw new Error('Internal error: can not create piece without mix stem');
        }

        if (!this.state.committedEditorState) {
            throw new Error('Internal error: can not create piece without editor state');
        }

        const mixStem = this.state.mixStemState;
        const previewAudio = this.state.previewAudioState.state === 'DONE' ? this.state.previewAudioState : null;
        const coverImage = this.state.coverImageState.state === 'DONE' ? this.state.coverImageState : null;
        const pieceInfo = this.state.committedEditorState;

        const loopMarkers = this.props.input.musicalMetadata.loop;

        const pieceInput: PieceInput = {
            attribution: this.props.input.attribution,
            musicalMetadata: {
                lengthUs: this.props.input.musicalMetadata.lengthMicroseconds,
                loop: loopMarkers && {
                    startUs: loopMarkers.startMicroseconds,
                    endUs: loopMarkers.endMicroseconds,
                },
                tempo: this.props.input.musicalMetadata.tempo,
                timeSignature: this.props.input.musicalMetadata.timeSignature,
            },
            presentation: {
                coverImage: coverImage && { [coverImage.asset_type]: coverImage.url },
                preview: previewAudio && { [previewAudio.asset_type]: previewAudio.url },
                title: pieceInfo.title,
                description: pieceInfo.description,
                isListed: pieceInfo.listed,
            },
            stems: {
                mixStem: { [mixStem.asset_type]: mixStem.url },
            },
        };

        this.setState({
            isUploading: true,
        } as CoordinatorState);

        DropAPI.dropPiece(pieceInput, result => {
            this.setState({
                isUploadCompleted: true,
                isUploading: false,
                createPieceResult: result,
            } as CoordinatorState);
        });
    }
}

function shouldCreatePiece(from: CoordinatorState, to: CoordinatorState): boolean {
    const allUploadsWereComplete = allUploadsComplete(from);
    const allUploadsAreComplete = allUploadsComplete(to);

    return (
        to.isEditingCommitted
        && !to.isUploadCompleted && !to.isUploading
        && !allUploadsWereComplete && allUploadsAreComplete
    );
}

function allUploadsComplete(state: CoordinatorState): boolean {
    return (
        (state.coverImageState.state === 'NO_ASSET' || state.coverImageState.state === 'DONE')
        && (state.previewAudioState.state === 'NO_ASSET' || state.previewAudioState.state === 'DONE')
        && state.mixStemState.state === 'DONE'
    );
}

function mimeToAudioAssetType(mime: string): AudioAssetType {
    if (mime === 'audio/x-wav') {
        return 'wav';
    }
    else if (mime === 'audio/x-ogg') {
        return 'ogg';
    }

    throw new Error(`Unknown audio MIME type: ${mime}, we only support Ogg/Vorbis and WAVE`);
}

function mimeToImageAssetType(mime: string): ImageAssetType {
    if (mime === 'image/png') {
        return 'png';
    }

    throw new Error(`Unknown image MIME type: ${mime}, we only support PNG`);
}
