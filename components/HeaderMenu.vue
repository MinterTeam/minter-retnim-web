<script>
    import {FOUNDATION_URL, BONUS_URL} from "~/assets/variables";

    export default {
        // is foundation or bonus website
        IS_FOUNDATION: true,
        computed: {
            localePrefix() {
                if (this.$i18n.locale === this.$i18n.defaultLocale) {
                    return '';
                } else {
                    return '/' + this.$i18n.locale;
                }
            },
            foundationUrl() {
                return FOUNDATION_URL + this.localePrefix + '/dashboard';
            },
            bonusUrl() {
                return BONUS_URL + this.localePrefix;
            },
        },
    };
</script>

<template>
    <div class="header__menu">
        <a class="header__link" :href="foundationUrl" v-if="!$options.IS_FOUNDATION">{{ $td('Dashboard', 'header.dashboard') }}</a>
        <nuxt-link class="header__link is-active" :to="preferredPath('index')" v-else>{{ $td('Dashboard', 'header.dashboard') }}</nuxt-link>
        <a class="header__link" :href="bonusUrl" v-if="$options.IS_FOUNDATION">{{ $td('Bonuses & Airdrops', 'header.bonus') }}</a>
        <nuxt-link class="header__link is-active" :to="preferredPath('index')" v-else>{{ $td('Bonuses & Airdrops', 'header.bonus') }}</nuxt-link>
    </div>
</template>
