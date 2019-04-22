export const BASE_TITLE = 'Minter Download Server';
export const BASE_DESCRIPTION = '';
export const FOUNDATION_URL = process.env.APP_FOUNDATION_URL || 'https://minternetwork.com';
export const BONUS_URL = process.env.APP_BONUS_URL || 'https://bonus.minternetwork.com';
export const FOUNDATION_API_URL = FOUNDATION_URL + '/api/v1/';
export const NETWORK = process.env.APP_ENV === 'production' ? 'mainnet' : 'testnet';
export const COIN_NAME = process.env.APP_ENV === 'production' ? 'BIP' : 'MNT';
export const LANGUAGE_COOKIE_KEY = 'minter-language';
export const I18N_ROUTE_NAME_SEPARATOR = '___';
export const USER_TYPES = {
    VALIDATOR: 'validator',
    DELEGATOR: 'delegator',
    COINER: 'creator',
    USER: 'user',
};
export const USER_TYPE_NAMES = {
    [USER_TYPES.VALIDATOR]: 'Validator',
    [USER_TYPES.DELEGATOR]: 'Delegator',
    [USER_TYPES.COINER]: 'Coiner',
    [USER_TYPES.USER]: 'User',
};
