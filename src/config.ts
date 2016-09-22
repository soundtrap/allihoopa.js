export interface IOptions {
    appKey: string;
    appSecret: string;
}

let CURRENT_OPTIONS: IOptions | null = null;

/**
 * Configure the Allihoopa SDK.
 */
export function setup(options: IOptions) {
    if (CURRENT_OPTIONS !== null) {
        throw new Error('Can not configure the Allihoopa SDK more than once');
    }

    CURRENT_OPTIONS = options;
}

export function getAppKey(): string {
    if (CURRENT_OPTIONS === null) {
        throw new Error('Allihoopa SDK not yet configured; please call setup() first');
    }

    return CURRENT_OPTIONS.appKey;
}

export function getAppSecret(): string {
    if (CURRENT_OPTIONS === null) {
        throw new Error('Allihoopa SDK not yet configured; please call setup() first');
    }

    return CURRENT_OPTIONS.appSecret;
}

export function getWebDomain(): string {
    return 'allihoopa.com';
}

export function getAPIDomain(): string {
    return 'api.allihoopa.com';
}

/// Should only be used for testing
export function clearConfiguration() {
    CURRENT_OPTIONS = null;
}
