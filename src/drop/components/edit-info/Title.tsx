import * as Radium from 'radium';
import * as React from 'react';

import {AllihoopaLogo} from '../../../icons/AllihoopaLogo';

import * as CommonStyles from '../../styles/CommonStyles';

@Radium
export class Title extends React.Component<void, void> {
    render(): JSX.Element {
        return (
            <div
                style={CONTAINER_STYLE}
            >
                <button
                    style={[CANCEL_BUTTON_STYLE, CommonStyles.FLAT_BUTTON_STYLE]}
                >
                    Cancel
                </button>
                <a
                    href='https://allihoopa.com'
                    target='_blank'
                >
                    <img
                        style={PROFILE_IMAGE_STYLE}
                        src='https://ugc.ahcdn.se/production/resized_img/e6aa28e3-159b-4865-a947-fdf201c5436a'
                    />
                </a>
                <div
                    style={HEADER_CONTAINER_STYLE}
                >
                    <AllihoopaLogo
                        style={LOGO_STYLE}
                    />
                    <div
                        style={HEADER_STYLE}
                    >
                        Drop to Allihoopa
                    </div>
                </div>
            </div>
        );
    }
}

const CONTAINER_STYLE: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

    [CommonStyles.MQ_MIN_WIDTH_SMALL]: {
        flexDirection: 'row-reverse',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
};

const HEADER_CONTAINER_STYLE: React.CSSProperties = {
    flexBasis: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    [CommonStyles.MQ_MIN_WIDTH_SMALL]: {
        flexDirection: 'row',
    },
};

const CANCEL_BUTTON_STYLE: React.CSSProperties = {
    color: CommonStyles.DUSTY_GRAY_COLOR,
    cursor: 'pointer',

    [CommonStyles.MQ_MIN_WIDTH_SMALL]: {
        display: 'none',
    },
};

const PROFILE_IMAGE_STYLE: React.CSSProperties = {
    width: 36,
    height: 36,
    borderRadius: '100%',
};

const LOGO_STYLE: React.CSSProperties = {
    width: 36,
    height: 36,
};

const HEADER_STYLE: React.CSSProperties = {
    fontWeight: CommonStyles.FONT_WEIGHT_LIGHT,
    fontSize: 28,
    letterSpacing: -0.4,
    color: CommonStyles.MASALA_COLOR,

    [CommonStyles.MQ_MIN_WIDTH_SMALL]: {
        fontSize: 40,
        letterSpacing: -0.7,
    },
};
