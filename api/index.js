import retnim from '~/api/retnim';

/**
 *
 * @return {Promise<Array<Snapshot> | never>}
 */
export function getShapshotList() {
    return retnim.get('data.json')
        .then((response) => {
            return response.data.map((snapshot) => {
                return {
                    ...snapshot,
                    timestamp: Number(snapshot.timestamp),
                    size: Number(snapshot.size),
                }
            })
        });
}

/**
 * @typedef {Object} Snapshot
 * @property {string} title
 * @property {string} url
 * @property {number} timestamp
 * @property {number} size
 */
