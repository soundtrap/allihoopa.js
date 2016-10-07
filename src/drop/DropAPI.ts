import {CreatedPiece, PieceInput} from './DropInterfaces';

import {graphQLQuery, ResultCallback} from '../graphql';

export function uploadResource(
    data: Blob,
    completionCallback: ResultCallback<string>,
    progressCallback: ProgressCallback
) {
    getUrls(1, (result) => {
        if (result.status === 'OK') {
            const url = result.data[0];
            uploadFile(
                url,
                data,
                (result) => {
                    if (result.status === 'OK') {
                        completionCallback({ status: 'OK', data: url });
                    }
                    else {
                        completionCallback(result);
                    }
                },
                (progress: number) => { progressCallback(progress); }
            );
        }
        else {
            completionCallback(result);
        }
    });
}

export function getUrls(count: number, callback: ResultCallback<string[]>) {
    const query = `
        mutation ($count: Int!) {
            uploadUrls(count: $count) {
                urls
            }
        }`;

    graphQLQuery<{uploadUrls: {urls: string[]}}>(
        query,
        { count: count },
        (result) => {
            if (result.status === 'OK') {
                callback({ status: 'OK', data: result.data.uploadUrls.urls });
            }
            else {
                callback(result);
            }
        }
    );
}

export type CompletionCallback = (successful: boolean) => void;
export type ProgressCallback = (progress: number) => void;

export function uploadFile(url: string, data: Blob, completionCallback: ResultCallback<null>, progressCallback: ProgressCallback) {
    if (!url) {
        throw new Error('No file url');
    }
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.setRequestHeader('Content-type', ' ');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            completionCallback({ status: 'OK', data: null });
        } else if (xhr.readyState === 4) {
            completionCallback({
                status: 'ERROR',
                error: new Error('Could not upload file. Status = ' + xhr.status + ' ' + xhr.responseText) });
        }
    };

    xhr.upload.onprogress = function(e) {
        if (e.lengthComputable) {
            progressCallback(Math.round((e.loaded / e.total) * 100));
        }
    };

    xhr.send(data);
}

interface DropPieceResult {
    dropPiece: {
        piece: CreatedPiece,
    };
}

export function dropPiece(piece: PieceInput, callback: ResultCallback<CreatedPiece>) {
    const query = `
        mutation ($piece: PieceInput!) {
            dropPiece(piece: $piece) {
                piece {
                    url
                    title
                    coverImage(position: 10 withFallback: true) {
                        url
                    }
                }
            }
        }`;

    graphQLQuery<DropPieceResult>(query, { piece: piece }, (result) => {
        if (result.status === 'OK') {
            callback({ status: 'OK', data: result.data.dropPiece.piece });
        }
        else {
            callback(result);
        }
    });
}
