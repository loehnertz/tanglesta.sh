<template>
    <section>
        <div class="box">
            <div class="field">
                <label class="label">Node-Provider</label>
                <p class="control has-icons-left">
                    <input class="input is-medium" type="text" placeholder="Node-Provider" v-model="provider">
                    <span class="icon is-small is-left">
                        <i class="fa fa-server"></i>
                    </span>
                </p>
            </div>
        </div>
        <div class="box">
            <label class="label">Seed</label>
            <div class="field has-addons">
                <p class="control has-icons-left is-expanded">
                    <input class="input is-medium" type="text" placeholder="Seed"
                           v-model="seed"
                           :disabled="autoSeed"
                    >
                    <span class="icon is-small is-left">
                        <i class="fa fa-cubes"></i>
                    </span>
                </p>
                <p class="control">
                    <span class="select is-medium">
                        <select title="autoSeed" v-model="autoSeed" v-on:change="generateNewSeed">
                            <option :value="true">automatic seed</option>
                            <option :value="false">custom seed</option>
                        </select>
                    </span>
                </p>
            </div>
        </div>
        <div class="box">
            <label class="label">Default Save Location</label>
            <div class="field has-addons">
                <p class="control has-icons-left is-expanded">
                    <input class="input is-medium" type="text" placeholder="Default Save Location"
                           v-model="defaultSaveLocation"
                           :disabled="!defaultLocation"
                           v-on:click="askForDefaultSaveLocation"
                    >
                    <span class="icon is-small is-left">
                        <i class="fa fa-save"></i>
                    </span>
                </p>
                <p class="control">
                    <span class="select is-medium">
                        <select title="defaultLocation"
                                v-model="defaultLocation"
                                v-on:change="resetDefaultSaveLocation"
                        >
                            <option :value="false">ask for every retrieval</option>
                            <option :value="true">set default location</option>
                        </select>
                    </span>
                </p>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'settings',
        data() {
            return ({
                autoSeed: true,
                defaultLocation: false,
            });
        },
        computed: {
            provider: {
                get() {
                    return this.$store.state.Settings.provider;
                },
                set(provider) {
                    this.$store.commit('setProvider', provider);
                }
            },
            seed: {
                get() {
                    return this.$store.state.Settings.seed;
                },
                set(seed) {
                    this.$store.commit('setSeed', seed);
                }
            },
            defaultSaveLocation: {
                get() {
                    return this.$store.state.Settings.defaultSaveLocation;
                },
                set(defaultSaveLocation) {
                    this.$store.commit('setDefaultSaveLocation', defaultSaveLocation);
                }
            },
        },
        mounted() {
            this.$electron.ipcRenderer.on('selected-directory', (event, path) => {
                this.defaultSaveLocation = path[0];
            });

            this.generateNewSeed();
        },
        methods: {
            generateNewSeed() {
                if (this.autoSeed) {
                    this.$store.commit('setSeed', 'NEWSEED');  // TODO: Implement this
                }
            },
            askForDefaultSaveLocation() {
                this.$electron.ipcRenderer.send('open-directory-dialog');
            },
            resetDefaultSaveLocation() {
                this.$store.commit('setDefaultSaveLocation', '');
            },
        }
    }
</script>

<style scoped>

</style>
