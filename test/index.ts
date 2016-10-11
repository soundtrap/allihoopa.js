import * as Config from '../src/config';
import * as Cookie from '../src/cookie';

const TEST_COOKIE_NAME = 'ah-test-cookie';

describe('Cookie storage', () => {
    it('clears the cookie', () => {
        Cookie.clearCookie(TEST_COOKIE_NAME);

        expect(Cookie.getCookie(TEST_COOKIE_NAME)).toBeNull();
    });

    it('sets the cookie', () => {
        const value = `sample value ${Math.random()}`;
        Cookie.setPersistentCookie(TEST_COOKIE_NAME, value);

        expect(Cookie.getCookie(TEST_COOKIE_NAME)).toBe(value);
    });
});


describe('Configuration', () => {
    const appKey = 'test-app-key';
    const appSecret = 'test-app-secret';

    beforeEach(() => {
        Config.clearConfiguration();
    });

    it('sets the configuration', () => {
        Config.setup({
            app: appKey,
            apiKey: appSecret,
        });

        expect(Config.getApplicationIdentifier()).toBe(appKey);
        expect(Config.getAPIKey()).toBe(appSecret);
    });

    it('can not set the configuration twice', () => {
        Config.setup({
            app: appKey,
            apiKey: appSecret,
        });

        const secondSetup = () => {
            Config.setup({
                app: appKey,
                apiKey: appSecret,
            });
        };

        expect(secondSetup).toThrow();
    });

    it('should use the live domain setup', () => {
        expect(Config.getWebDomain()).toBe('allihoopa.com');
        expect(Config.getAPIDomain()).toBe('api.allihoopa.com');
    });

    it('rejects missing configuration', () => {
        expect(() => (Config.setup as any)()).toThrow();
    });

    it('rejects empty configuration', () => {
        expect(() => Config.setup({} as any)).toThrow();
    });

    it('rejects invalid configuration', () => {
        expect(() => Config.setup({ dummy: 'invalid' } as any)).toThrow();
    });

    it('rejects invalid app identifier type', () => {
        expect(() => Config.setup({ app: 123, apiKey: 'something' } as any)).toThrow();
    });

    it('rejects invalid api key type', () => {
        expect(() => Config.setup({ app: 'something', apiKey: 123 } as any)).toThrow();
    });
});
