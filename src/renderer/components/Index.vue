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
        methods: {

        }
    }
</script>

<style>

</style>
