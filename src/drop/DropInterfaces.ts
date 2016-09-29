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
    mixStem: Array<ExternalResourceInput>;
}

export interface ExternalResourceInput {
    fileType: string;
    url: string;
}

export interface PresentationDataInput {
    title: string;
    description?: string;
    isListed: boolean;
    preview: Array<ExternalResourceInput>;
    coverImage: Array<ExternalResourceInput>;
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
}

export interface File {
    url: string;
    data: any;
}