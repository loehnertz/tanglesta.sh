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
        background-color: whitesmoke;
    }

    main {
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100vw;
        max-width: 960px;
        padding: 2rem;
        margin: 0 auto;
    }

    section {
        padding: 1rem;
    }

    /*
     Overwriting Bulma's default styles for these.
     Had to add a lot of '!important' here because otherwise the rules would be overwritten
     during the building process even though the CSS cascade was correct.
    */
    .input:focus,
    .input.is-focused,
    .input:active,
    .input.is-active,
    .textarea:focus,
    .textarea.is-focused,
    .textarea:active,
    .textarea.is-active {
        border-color: #00d1b2 !important;
        -webkit-box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25) !important;
        box-shadow: 0 0 0 0.125em rgba(0, 209, 178, 0.25) !important;
    }

    .file-name {
        max-width: 15em !important;
    }

    .notification {
        text-align: center !important;
    }
</style>
