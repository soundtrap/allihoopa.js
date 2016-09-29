import {DropPiece, PieceInput, ExternalResourceInput, File} from './DropInterfaces';

import {graphQLQuery} from './../graphql';

export type UploadResourceCallback = (resource: ExternalResourceInput) => void;

export function uploadResource(resource: ExternalResourceInput, data: any, callback: UploadResourceCallback) {
    getUrls(1, (urls) => {
        uploadFile(urls[0], data, (successful: boolean) => {
            if (successful) {
                const resourceObj: ExternalResourceInput = {
                    fileType: resource.fileType,
                    url: urls[0]
                };

                callback(resourceObj);
            }
        });
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

export type UploadFilesCallback = (successful: boolean) => void;

export function uploadFiles(files: Array<File>, callback: UploadFilesCallback) {
    files.forEach(function(file: File) {
        uploadFile(file.url, file.data, (successful) => {
            if (successful) {
                callback(true);
            }
        });
    });
}

export type UploadFileCallback = (successful: boolean) => void;

export function uploadFile(url: string, data: any, callback: UploadFileCallback) {
    if (!url) {
        throw new Error('No file url');
    }
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-type', ' ');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(true);
        } else if (xhr.readyState === 4) {
            throw new Error('Could not upload file. Status = ' + xhr.status + ' ' + xhr.responseText);
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