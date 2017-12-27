<template>
    <main>
        <h1>tanglesta.sh</h1>
        <tabs>
            <tab name="Retrieve from Tangle">
                <retrieve-from-tangle></retrieve-from-tangle>
            </tab>
            <tab name="Persist to Tangle">
                <persist-to-tangle></persist-to-tangle>
            </tab>
            <tab name="Settings">
                <settings></settings>
            </tab>
        </tabs>
    </main>
</template>

<script>
    import RetrieveFromTangle from './Tabs/RetrieveFromTangle'
    import PersistToTangle from './Tabs/PersistToTangle'
    import Settings from './Tabs/Settings'

    export default {
        name: 'index',
        components: {RetrieveFromTangle, PersistToTangle, Settings},
        methods: {}
    }
</script>

<style>
    h1 {
        flex-basis: 10%;
        font-size: 2rem;
        text-align: center;
    }

    .tabs-component-tabs {
        border: solid 1px #ddd;
        border-radius: 6px;
        margin-bottom: 5px;
    }

    .tabs-component-tab {
        color: #999;
        font-size: 14px;
        font-weight: 600;
        flex: 1;
        margin-right: 0;
        list-style: none;
    }

    .tabs-component-tab:hover {
        color: #666;
    }

    .tabs-component-tab.is-active {
        color: #000;
    }

    .tabs-component-tab.is-disabled * {
        color: #cdcdcd;
        cursor: not-allowed !important;
    }

    .tabs-component-tab-a {
        display: block;
        text-align: center;
        color: inherit;
        padding: .75em 1em;
        text-decoration: none;
    }

    .tabs-component-panels {
        padding: 4em 0;
    }

    @media (min-width: 700px) {
        .tabs-component {
            display: flex;
            flex-direction: column;
            flex-basis: 90%;
        }

        .tabs-component-tabs {
            border: 0;
            align-items: stretch;
            display: flex;
            justify-content: flex-start;
            margin-bottom: -1px;
        }

        .tabs-component-tab {
            position: relative;
            z-index: 1;
            background-color: #fff;
            border: solid 1px #ddd;
            border-radius: 3px 3px 0 0;
            margin-right: .5em;
            transform: translateY(2px);
            transition: transform .5s ease;
        }

        .tabs-component-tab:last-child {
            margin-right: 0;
        }

        .tabs-component-tab.is-active {
            position: relative;
            z-index: 3;
            border-bottom: solid 1px #fff;
            transform: translateY(0);
        }

        .tabs-component-panels {
            flex: 1;
            position: relative;
            z-index: 2;
            background-color: #fff;
            border: solid 1px #ddd;
            border-radius: 0 0 6px 6px;
            box-shadow: 0 0 10px rgba(0, 0, 0, .05);
            padding: 4em 2em;
        }
    }
</style>
