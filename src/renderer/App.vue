<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'tanglestash'
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Source Sans Pro', sans-serif;
    }

    main {
        display: flex;
        flex-direction: column;
        background-color: whitesmoke;
        height: 100vh;
        width: 100vw;
        padding: 2rem;
    }

    section {
        padding: 1rem;
    }

    /* Overwrite Bulma's default style for these */
    .input:focus,
    .input.is-focused,
    .input:active,
    .input.is-active,
    .textarea:focus,
    .textarea.is-focused,
    .textarea:active,
    .textarea.is-active {
        border-color: #00d1b2;
        -webkit-box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25);
        box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25);
    }
</style>
