// API data
export interface PieceInput {
    stems: StemsInput;
    presentation: PresentationDataInput;
    attribution?: AttributionDataInput;
    musicalMetadata: MusicalMetadataInput;
}

export interface DropPiece {
    uuid: string;
    url: string;
    shortId: string;
}

export interface StemsInput {
    mixStem: AudioResourceInput;
}

export interface AudioResourceInput {
    wav?: string;
    ogg?: string;
}

export interface ImageResourceInput {
    png: string;
}

export interface PresentationDataInput {
    title: string;
    description?: string;
    isListed?: boolean;
    preview: AudioResourceInput;
    coverImage?: ImageResourceInput;
}

export interface AttributionDataInput {
    basedOnPieces: Array<string>;
}

export interface MusicalMetadataInput {
    lengthUs: number;
    tempo?: FixedTempoInput;
    loop?: LoopInput;
    timeSignature?: FixedTimeSignatureInput;
}

export interface FixedTempoInput {
    fixed: number;
}

export interface LoopInput {
    startUs: number;
    endUs: number;
}

export interface FixedTimeSignatureInput {
    fixed: TimeSignatureInput;
}

export interface TimeSignatureInput {
    upper: number;
    lower: number;
}

export enum Status {
    MAIN,
    WAITING,
    COMPLETED,
    ERROR
}

// state 
export interface DropOverlayState {
    title?: string;
    titleActive?: boolean;
    description?: string;
    descriptionActive?: boolean;
    isListed?: boolean;
    coverImageUrlWithFallback?: string;
    hasCoverImage?: boolean;
    coverImageData?: string;
    dropPiece?: DropPiece;
    status?: Status;
    uploadProgress?: number;
    errorMessage?: string;
}

export interface File {
    url: string;
    data: any;
}

export interface UploadStatus {
    [key: string]: boolean;
}

export interface UploadProgress {
    [key: string]: number;
}