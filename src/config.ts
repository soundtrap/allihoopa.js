export interface IOptions {
    app: string;
    apiKey: string;
}

let CURRENT_OPTIONS: IOptions | null = null;

/**
 * Configure the Allihoopa SDK.
 */
export function setup(options: IOptions) {
    if (CURRENT_OPTIONS !== null) {
        throw new Error('Can not configure the Allihoopa SDK more than once');
    }

    if (!options) {
        throw new Error('Options to setup() not provided');
    }

    if (!options.app || typeof options.app as any !== 'string') {
        throw new Error('Field `app` of configuration is missing or invalid');
    }

    if (!options.apiKey || typeof options.apiKey as any !== 'string') {
        throw new Error('Field `apiKey` of configuration is missing or invalid');
    }

    CURRENT_OPTIONS = options;
}

export function getApplicationIdentifier(): string {
    if (CURRENT_OPTIONS === null) {
        throw new Error('Allihoopa SDK not yet configured; please call setup() first');
    }

    return CURRENT_OPTIONS.app;
}

export function getAPIKey(): string {
    if (CURRENT_OPTIONS === null) {
        throw new Error('Allihoopa SDK not yet configured; please call setup() first');
    }

    return CURRENT_OPTIONS.apiKey;
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
