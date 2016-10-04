export interface DropPieceData {
    stems: StemsData;
    presentation: PresentationData;
    attribution?: AttributionData;
    musicalMetadata: MusicalMetadata;
}

export type BlobCallback = (data: Blob | null, error: Error | null) => void;

export interface StemsData {
    mixStem: (completion: BlobCallback) => void;
}

export interface PresentationData {
    title: string;
    preview?: (completion: BlobCallback) => void;
    coverImage?: (completion: BlobCallback) => void;
}

export interface AttributionData {
    basedOnPieces: Array<string>;
}

export interface MusicalMetadata {
    lengthMicroseconds: number;
    tempo?: FixedTempoData;
    loop?: LoopMarkerData;
    timeSignature?: FixedTimeSignatureData;
}

export interface FixedTempoData {
    fixed: number;
}

export interface LoopMarkerData {
    startMicroseconds: number;
    endMicroseconds: number;
}

export interface FixedTimeSignatureData {
    fixed: TimeSignatureData;
}

export interface TimeSignatureData {
    upper: number;
    lower: number;
}

export class DropPiece {
    stems: StemsData;
    presentation: PresentationData;
    attribution?: AttributionData;
    musicalMetadata: MusicalMetadata;

    constructor(data: DropPieceData) {
        this.stems = data.stems;
        this.presentation = data.presentation;
        this.attribution = data.attribution;
        this.musicalMetadata = data.musicalMetadata;
    }
}
