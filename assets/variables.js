export const MAINNET = 'mainnet';
export const TESTNET = 'testnet';
export const NETWORK = process.env.APP_ENV === 'production' ? MAINNET : TESTNET;

export const BASE_TITLE = 'Minter Download Server';
export const BASE_DESCRIPTION = '';
export const SNAPSHOT_API_URL = process.env.APP_SNAPSHOT_API_URL + '/';
export const COIN_NAME = NETWORK === MAINNET ? 'BIP' : 'MNT';
export const LANGUAGE_COOKIE_KEY = 'minter-language';
export const I18N_ROUTE_NAME_SEPARATOR = '___';
