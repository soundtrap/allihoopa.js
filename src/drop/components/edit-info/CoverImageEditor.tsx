import * as Radium from 'radium';
import * as React from 'react';

import * as CommonStyles from '../../styles/CommonStyles';
import {DefaultCover} from '../DefaultCover';

export interface CoverImageEditorProps {
    dataURL: string | null;
    onChange: (image: Blob) => void;
}

@Radium
export class CoverImageEditor extends React.Component<CoverImageEditorProps, void> {
    imageInput: HTMLInputElement | null;

    render(): JSX.Element {
        return (
            <div
                style={CONTAINER_STYLE}
            >
                { this.props.dataURL
                    ? <img
                        style={{ width: '100%', height: '100%' }}
                        src={this.props.dataURL}
                    />
                    : <DefaultCover />
                }

                <button
                    style={[CommonStyles.FLAT_BUTTON_STYLE, BUTTON_STYLE]}
                    onClick={(e) => this.handleOpenFileBrowser(e)}
                >
                    Edit Cover
                </button>

                <input
                    type='file'
                    accept='image/png'
                    ref={input => { this.imageInput = input; }}
                    style={{display: 'none'}}
                    value=''
                    onChange={e => this.handleImageInput(e)} />
            </div>
        );
    }

    private handleImageInput(e: React.FormEvent): void {
        const files = (e.target as HTMLInputElement).files;
        if (!files) {
            return;
        }

        const image = files[0];
        if (!image) {
            return;
        }

        this.props.onChange(image);
    }

    private handleOpenFileBrowser(e: React.SyntheticEvent): void {
        e.preventDefault();

        const coverImageInput = this.imageInput;

        if (!coverImageInput) {
            throw new Error('Could not find element');
        }

        coverImageInput.click();
    }
}

const BUTTON_STYLE: React.CSSProperties = {
    color: '#fff',
    background: 'rgba(0, 0, 0, 0.3)',
    border: '1px solid #fff',
    cursor: 'pointer',
    position: 'absolute',
    bottom: 20,
    left: 16,
    width: 'calc(100% - 32px)',
    padding: 8,
};

const CONTAINER_STYLE: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
};
