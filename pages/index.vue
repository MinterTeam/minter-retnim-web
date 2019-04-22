<script>
    import Fuse from 'fuse.js';
    import {getShapshotList} from "~/api/index";
    import getTitle from '~/assets/get-title';
    import checkEmpty from '~/assets/v-check-empty';
    import {getTime, prettyBytes} from "~/assets/utils";

    const fuseOptions = {
        shouldSort: false,
        tokenize: true,
        matchAllTokens: true,
        includeMatches: false,
        threshold: 0.1,
        location: 0,
        distance: 1000,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ['title', 'prettySize', 'date'],
        /*keys: [{
            name: 'text',
            weight: 1,
        }, {
            name: 'response_text',
            weight: 0.5,
        }]*/
    };

    let fuse;

    export default {
        asyncData({ error }) {
            return getShapshotList()
                .then((snapshotList) => {
                    return {
                        snapshotList,
                    };
                })
                .catch((resError) => {
                    console.log(resError, resError.response);
                    if (resError.response && resError.response.status) {
                        error({
                            statusCode: resError.response.status,
                            message: resError.response.statusText,
                        });
                    } else {
                        error({ statusCode: resError.request && resError.request.status, message: resError.message });
                    }
                });
        },
        head() {
            const title = getTitle('Download Server');
            const description = '';

            return {
                title: title,
                meta: [
                    { hid: 'og-title', name: 'og:title', content: title },
                    { hid: 'description', name: 'description', content: description },
                    { hid: 'og-description', name: 'og:description', content: description },
                    { hid: 'og-image', name: 'og:image', content: `/img/social-share.png` },
                ],
            };
        },
        components: {

        },
        directives: {
            checkEmpty,
        },
        filters: {
            getTime,
            prettyBytes,
        },
        data() {
            return {
                /** @type Array<Snapshot> */
                snapshotList: [],
                sort: {
                    // 0 - no sort, -1 - ascending, 1 - descending
                    title: 0,
                    timestamp: 1,
                    size: 0,
                },
                searchQuery: '',
            };
        },
        computed: {
            snapshotListFormatted() {
                const list = this.snapshotList.map((item) => {
                    return {
                        ...item,
                        date: getTime(item.timestamp),
                        prettySize: prettyBytes(item.size),
                    }
                });
                fuse = new Fuse(list, fuseOptions);

                return list;
            },
            searchResult() {
                if (this.searchQuery) {
                    return fuse.search(this.searchQuery);
                } else {
                    return this.snapshotListFormatted;
                }
            },
            snapshotListSorted() {
                return this.searchResult.slice(0).sort(makeSortQueue([
                    makeOrderedSortFn('title', this.sort.title, stringSortFn),
                    makeOrderedSortFn('timestamp', this.sort.timestamp, valueSortFn),
                    makeOrderedSortFn('size', this.sort.size, valueSortFn),
                ]));
            },
        },
        mounted() {

        },
        destroyed() {

        },
        methods: {
            toggleSort(field) {
                // remove other fields from sort
                Object.keys(this.sort).forEach((key) => {
                    if (key !== field && this.sort[key] !== 0) {
                        this.sort[key] = 0;
                    }
                });
                // change field sort order between -1, 0, 1
                if (this.sort[field] === 1) {
                    this.sort[field] = -1;
                } else {
                    this.sort[field] += 1;
                }
            },
            getSortClass(field) {
                switch (this.sort[field]) {
                    case 1:
                        return 'dashboard__table-sort-button-icon--ascending';
                    case -1:
                        return 'dashboard__table-sort-button-icon--descending';
                    case 0:
                        return '';
                }
            },
        },
    };
    function stringSortFn(a, b) {
        return ('' + b).localeCompare(a);
    }

    /**
     * Default descending: 2 -> 1
     */
    function valueSortFn(a, b) {
        return b - a;
    }

    /**
     * Change sort order direction depending on `order` (-1, 0, 1)
     * @param {string} fieldName - name of field in the sort object
     * @param {number} order - 0: no sort, 1: default, -1: inverse
     * @param {Function} sortFn
     */
    function makeOrderedSortFn(fieldName, order, sortFn) {
        return function(a, b) {
            return order * sortFn(a[fieldName], b[fieldName]);
        };
    }

    /**
     * Make sort function, which will apply every sortFn from array of sort functions, next sortFn applies only if previous returned `0`
     * @param {Array<Function>} fnArray
     * @return {Function} sort function
     */
    function makeSortQueue(fnArray) {
        return function(a, b) {
            return fnArray.reduce((result, sortFnItem) => {
                // if result === 0 => apply sortFnItem
                return result || sortFnItem(a, b);
            }, 0);
        };
    }


</script>

<template>
    <!-- layout dashboard -->
    <div class="main-content--with-header">
        <header class="header">
            <div class="header__container u-container u-container--medium">
                <nuxt-link class="header__logo no-link" to="/">
                    <img class="header__logo-image" src="/img/minter-logo-circle.svg" alt="Minter" width="36" height="36">
                    <div class="header__logo-text">Download Server</div>
                </nuxt-link>

            </div>
        </header>


        <main class="main-inner main-inner--snapshot u-container u-container--small">
            <div class="dashboard__table-header">
                <h1 class="dashboard__table-title dashboard__title">Download snapshot</h1>
                <label class="dashboard__table-search form-field form-field--invert form-field--with-icon">
                    <input class="form-field__input" type="text" inputmode="numeric" autocomplete="off" spellcheck="false" v-check-empty
                           v-model.trim="searchQuery"
                    />
                    <img class="form-field__icon" src="/img/icon-search.svg" alt="Copy">
                    <span class="form-field__label form-field__label--bright">Search</span>
                </label>
            </div>
            <hr class="hr--white">
            <div class="u-table-overflow u-container u-container--compensate">
                <table class="table__with-dividers">
                    <thead>
                    <tr>
                        <th class="dashboard__table-sort-cell">
                            <button class="dashboard__table-sort-button u-semantic-button" @click="toggleSort('title')">
                                <span class="dashboard__table-sort-button-text">Filename</span>
                                <img class="dashboard__table-sort-button-icon" :class="getSortClass('title')" v-show="getSortClass('title')" src="/img/icon-dropdown-white.svg" alt="Sort">
                                <img class="dashboard__table-sort-button-icon" v-show="!getSortClass('title')" src="/img/icon-sort.svg" alt="Sort">
                            </button>
                        </th>
                        <th class="dashboard__table-sort-cell">
                            <button class="dashboard__table-sort-button u-semantic-button" @click="toggleSort('timestamp')">
                                <span class="dashboard__table-sort-button-text">Date</span>
                                <img class="dashboard__table-sort-button-icon" :class="getSortClass('timestamp')" v-show="getSortClass('timestamp')" src="/img/icon-dropdown-white.svg" alt="Sort">
                                <img class="dashboard__table-sort-button-icon" v-show="!getSortClass('timestamp')" src="/img/icon-sort.svg" alt="Sort">
                            </button>
                        </th>
                        <th class="dashboard__table-sort-cell">
                            <button class="dashboard__table-sort-button u-semantic-button" @click="toggleSort('size')">
                                <span class="dashboard__table-sort-button-text">Size</span>
                                <img class="dashboard__table-sort-button-icon" :class="getSortClass('size')" v-show="getSortClass('size')" src="/img/icon-dropdown-white.svg" alt="Sort">
                                <img class="dashboard__table-sort-button-icon" v-show="!getSortClass('size')" src="/img/icon-sort.svg" alt="Sort">
                            </button>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="snapshot in snapshotListSorted" :key="snapshot.title">
                        <td><a class="link--default dashboard__table-url" :href="snapshot.url" target="_blank" rel="nofollow noopener">{{ snapshot.title }}</a></td>
                        <td>{{ snapshot.date }}</td>
                        <td class="dashboard__table-amount">{{ snapshot.prettySize }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </main>
    </div>
</template>
