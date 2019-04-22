<script>
    export default {
        props: ['error'],
        computed: {
        },
    };
</script>

<template>
    <!-- error layout -->
    <main class="main-content--center u-container u-container--medium">
        <div class="u-text-center">
            <h1 class="u-h1 error__title">
                <span v-if="error.statusText">{{ error.statusText }}</span>
                <span v-else>Error {{ error.statusCode }}</span>
            </h1>
            <p class="splash__text">
                <span v-if="error.statusCode === 404">Page not found</span>
                <span v-else-if="error.statusCode === 0">Network error</span>
                <span v-else-if="error.message">{{ error.message }}</span>
                <span v-else>Something went wrong</span>
            </p>
            <a href="http://tg://resolve?domain=MinterPSbot" class="button button--main" target="_blank" rel="noopener">
                <img class="button__icon" src="/img/icon-telegram-white.svg" alt="" role="presentation">
                Contact Support
            </a>
        </div>
    </main>
</template>
