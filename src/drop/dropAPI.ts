import {DropPiece, PieceInput, ExternalResourceInput, File} from './DropInterfaces';

import {graphQLQuery} from './../graphql';

export type UploadResourceCallback = (resource: ExternalResourceInput) => void;

export function uploadResource(resource: ExternalResourceInput, data: any, completionCallback: UploadResourceCallback, progressCallback: ProgressCallback) {
    getUrls(1, (urls) => {
        uploadFile(
            urls[0],
            data,
            (successful: boolean) => {
                if (successful) {
                    const resourceObj: ExternalResourceInput = {
                        fileType: resource.fileType,
                        url: urls[0]
                    };

                    completionCallback(resourceObj);
                }
            },
            (progress: number) => { progressCallback(progress); }
        );
    });
}

export type GetFileAsBytesCallback = (mixStemBlob: any) => void;

export function getFileAsBytes(url: string, callback: GetFileAsBytesCallback) {
    if (url.length > 0) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.onload = () => {
            if (xhr.status === 200) {
                const mixStemsBlob = xhr.response;

                if (!mixStemsBlob || mixStemsBlob.size <= 0) {
                    throw new Error('Could not load file.');
                }

                callback(mixStemsBlob);
            } else {
                throw new Error('Could not load file. Server responded with ' + xhr.status);
            }
        };
        xhr.send();
    }
}

export type GetUrlsCallback = (urls: Array<string>) => void;

export function getUrls(count: number, callback: GetUrlsCallback) {
    const query = {
        query: `
            mutation ($count: Int!) {
                uploadUrls(count: $count) {
                    urls
                }
            }`,
        variables: { count: count }
    };

    graphQLQuery(query, (success, resp) => {
        if (success) {
            const urls: Array<string> = (JSON.parse(resp)).data.uploadUrls.urls;

            callback(urls);
        }
    });
}

export type CompletionCallback = (successful: boolean) => void;
export type ProgressCallback = (progress: number) => void;

export function uploadFile(url: string, data: any, completionCallback: CompletionCallback, progressCallback: ProgressCallback) {
    if (!url) {
        throw new Error('No file url');
    }
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-type', ' ');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            completionCallback(true);
        } else if (xhr.readyState === 4) {
            throw new Error('Could not upload file. Status = ' + xhr.status + ' ' + xhr.responseText);
        }
    };

    xhr.upload.onprogress = function(e) {
        if (e.lengthComputable) {
            progressCallback(Math.round((e.loaded / e.total) * 100));
        }
    };

    xhr.send(data);
}

export type DropPieceCallback = (piece: DropPiece) => void;

export function dropPiece(piece: PieceInput, callback: DropPieceCallback) {
    const query = {
        query: `
            mutation ($piece: PieceInput!) {
                dropPiece(piece: $piece) {
                    piece { 
                        uuid,
                        shortId,
                        url 
                    }
                }
            }`,
        variables: { piece: piece }
    };

    graphQLQuery(query, (success, resp) => {
        if (success) {
            const piece: DropPiece = (JSON.parse(resp)).data.dropPiece.piece;

            callback(piece);
        }
    });
}