import format from 'date-fns/esm/format';
import bytes from 'pretty-bytes';
// import prettyNum from 'pretty-num';
// import decode from 'entity-decode';

export function getTime(timestamp) {
    const time = format(new Date(Number(timestamp)), 'dd-MMM-yyyy HH:mm');

    return time && time !== 'Invalid Date' ? time : false;
}

export function prettyBytes(filesize) {
    return bytes(Number(filesize));
}

// export function pretty(value) {
//     return decode(prettyNum(value, {precision: 4, rounding: 'significant', thousandsSeparator: '&thinsp;'}));
// }
// export function prettyUsd(value) {
//     return decode(prettyNum(value, {precision: 2, thousandsSeparator: '&thinsp;'}));
// }
// export function prettyRound(value) {
//     return decode(prettyNum(value, {precision: 0, thousandsSeparator: '&thinsp;'}));
// }
//
// export function shortFilter(value, endLength = 6, minLengthToShort) {
//     const startLength = endLength + 'Mx'.length - 1;
//     minLengthToShort = minLengthToShort || startLength + endLength;
//     value = value.toString();
//     const isLong = value.length > minLengthToShort;
//
//     return isLong ? value.substr(0, startLength) + '…' + value.substr(-endLength) : value;
// }
//
// /**
//  * Ensure that string us url, otherwise make it url
//  * @param {string} url
//  */
// export function ensureUrl(url) {
//     if (typeof url !== 'string') {
//         return url;
//     }
//
//     url = url.trim();
//     if (url.search(/https?:\/\//) !== 0) {
//         url = 'http://' + url;
//     }
//
//     return url;
// }
//
// export function prettyUrl(url) {
//     if (typeof url !== 'string') {
//         return url;
//     }
//
//     url = url.trim();
//     return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
// }
