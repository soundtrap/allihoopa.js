export enum StemType {ogg, wav};

export interface MixStem {
    type: StemType;
    url: string;
}

export interface BasedOnPiece {
    pieceId: string;
    pieceUrl: string;
}

export interface Tempo {
    fixed: number;
}

export interface Loop {
    startUs: number;
    endUs: number;
}

export interface TimeSignatureObject {
    upper: number;
    lower: number;
}

export interface TimeSignature {
    fixed: TimeSignatureObject;
}

export interface MusicalMetadata {
    lengthUs?: number;
    tempo?: Tempo;
    loop?: Loop;
    timeSignature?: TimeSignature;
}

export interface DropOverlayProps {
    stems: MixStem;
    attribution?: Array<BasedOnPiece>;
    musicalMetadata?: MusicalMetadata;
}

export interface DropOverlayState {
    title?: string;
    titleActive?: boolean;
    description?: string;
    descriptionActive?: boolean;
    listed?: boolean;
    coverImageUrlWithFallback?: string;
    hasCoverImage?: boolean;
    coverImageData?: any;
}