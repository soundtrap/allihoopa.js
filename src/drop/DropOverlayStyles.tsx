const turquoise = '#23a6bd';
const masala = '#4A4A4A';
const dustygray = '#9B9B9B';
const linkHover = '#63a2ac';

const styles = {
    dropOverlay: {
        background: '#fff',
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dropContainer: {
        background: '#fff',
        textAlign: 'left',
        maxWidth: '460px',
        width: '100%',
        maxHeight: '660px',
        height: '100%',
        overflow: 'scroll',
        padding: '10px',
        fontFamily: '-apple-system, ".SFNSText-Regular", "San Francisco", Roboto, "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif',
        '@media (max-width: 768px)': {
            maxWidth: '100%'
        }
    },
    dropHeading: {
        fontSize: '22px',
        lineHeight: 1.2,
        marginTop: '32px',
        marginBottom: '16px'
    },
    dropCoverLabel: {
        margin: '16px 0 4px 0'
    },
    dropCoverContainer: {
        width: '117px',
        height: '117px',
        position: 'relative',
        display: 'inline-block',
        boxShadow: '0 0 4px rgba(0, 0, 0, 0.1)'
    },
    dropCoverImage: {
        width: '100%',
        height: '100%'
    },
    colorLink: {
        color: turquoise,
        textDecoration: 'none',
        ':visited': {
            color: turquoise
        },
        ':hover': {
            color: linkHover
        },
        ':active': {
            color: linkHover
        }
    },
    dropCoverImageChange: {
        verticalAlign: 'bottom',
        marginLeft: '18px',
        textTransform: 'uppercase',
        fontSize: '14px'
    },
    dropCoverImageInput: {
        display: 'none'
    },
    dropPieceTitle: {
        marginTop: '12px',
        display: 'block',
        width: '100%',
        marginBottom: '16px',
        position: 'relative'
    },
    dropControlLabel: {
        color: dustygray,
        fontSize: '14px'
    },
    active: {
        color: turquoise
    },
    dropPieceTitleInput: {
        padding: '12px'
    },
    dropFormControl: {
        display: 'block',
        padding: '14px',
        borderRadius: 0,
        fontSize: '16px',
        color: masala,
        border: '1px solid #CCC',
        width: 'calc(100% - 26px)',
        WebkitAppearance: 'none',
        ':focus': {
            boxShadow: 'none',
            outline: 'none',
            border: `1px solid ${turquoise}`,
            background: 'rgba(74, 74, 74, 0.03)'
        }
    },
    dropPieceDescription: {
        display: 'block',
        width: '100%',
        marginBottom: '16px',
        position: 'relative'
    },
    dropCharacterCount: {
        fontSize: '12px',
        float: 'right'
    },
    dropPieceDescriptionTextarea: {
        resize: 'vertical'
    },
    dropPieceVisibility: {
        display: 'inline-block',
        verticalAlign: 'top',
        marginRight: '8px',
        marginBottom: '16px'
    },
    dropPieceButtons: {
        fontSize: '16px',
        display: 'block',
        marginTop: '16px',
        borderTop: '1px solid rgba(74, 74, 74, 0.1)',
        padding: '12px 8px 40px',
        '@media (min-width: 768px)': {
            height: '52px',
            padding: '12px 8px 12px 16px'
        }
    },
    dropLinkButtons: {
        float: 'right',
        marginTop: '3px',
        textTransform: 'uppercase',
        fontSize: '14px',
        border: 0,
        background: 'transparent',
        ':hover': {
            cursor: 'pointer'
        },
        ':disabled': {
            color: dustygray
        }
    },
    dropCancel: {
        marginRight: '26px'
    },
    dropDrop: {
        marginLeft: '2px',
        '@media (max-width: 768px)': {
            marginLeft: '20px'
        }
    }
};

export default styles;