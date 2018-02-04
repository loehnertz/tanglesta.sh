<template>
    <section>
        <div class="box">
            <div class="field">
                <label class="label">Node-Provider</label>
                <p class="control has-icons-left">
                    <input class="input is-medium" type="text" placeholder="Node-Provider"
                           v-model="provider"
                           v-on:keyup="updateProvider"
                    >
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
                    <input class="input is-medium" type="text" placeholder="Default Save Location" readonly
                           v-model="defaultSaveLocation"
                           :disabled="!useDefaultSaveLocation"
                           v-on:click="askForDefaultSaveLocation"
                    >
                    <span class="icon is-small is-left">
                        <i class="fa fa-save"></i>
                    </span>
                </p>
                <p class="control">
                    <span class="select is-medium">
                        <select title="useDefaultSaveLocation"
                                v-model="useDefaultSaveLocation"
                                v-on:change="resetDefaultSaveLocation"
                        >
                            <option :value="false">ask for every retrieval</option>
                            <option :value="true">set default location</option>
                        </select>
                    </span>
                </p>
            </div>
        </div>
        <v-dialog/>
    </section>
</template>

<script>
    const UserDataFile = '/settings.json';

    import fs from 'fs'
    import functions from '../../functions'
    import {Helpers} from 'tanglestash'

    export default {
        name: 'settings',
        data() {
            return ({
                autoSeed: true,
                useDefaultSaveLocation: !this.defaultSaveLocation,
                userDataLocation: null,
                tanglestash: null,
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
            this.$electron.ipcRenderer.on('retrieved-userdata-location', (event, path) => {
                this.userDataLocation = path;
                this.retrieveUserData();
            });

            this.$electron.ipcRenderer.on('selected-directory', (event, path) => {
                this.defaultSaveLocation = path[0];
                this.writeSettingsFile(['defaultSaveLocation', this.defaultSaveLocation]);
            });

            this.$electron.ipcRenderer.send('get-userdata-location');
            this.setupTanglestash();
            this.generateNewSeed();
        },
        methods: {
            showDialog(title, text) {
                title = title || 'Error';
                text = text || 'An error occured!';

                this.$modal.show('dialog', {
                    title: title,
                    text: text,
                    buttons: [
                        {
                            title: 'Close',
                            default: true,  // Will be triggered if 'Enter' is pressed
                            handler: () => {
                                this.hideDialog();
                            },
                        }
                    ]
                });

                // This call is needed due to a bug that deranges the 'z-index' of the tabs
                this.$electron.ipcRenderer.send('decrease-z-index-for-modal');
            },
            hideDialog() {
                // This call is needed due to a bug that deranges the 'z-index' of the tabs
                this.$electron.ipcRenderer.send('increase-z-index-for-modal');
                this.$modal.hide('dialog');
            },
            setupTanglestash() {
                this.tanglestash = functions.tanglestash(this.provider, this.seed);
            },
            generateNewSeed() {
                if (this.autoSeed) {
                    this.$store.commit('setSeed', Helpers.generateRandomIotaSeed());
                }
            },
            updateProvider() {
                this.writeSettingsFile(['provider', this.provider]);
            },
            retrieveUserData() {
                if (fs.existsSync(this.userDataLocation + UserDataFile)) {
                    fs.readFile(this.userDataLocation + UserDataFile, (err, data) => {
                        if (err) {
                            let errorMessage = functions.handleErrors(err);
                            this.showDialog('Error', errorMessage);
                        } else {
                            this.readSettingsFile(JSON.parse(data));
                        }
                    });
                } else {
                    fs.writeFileSync(
                        this.userDataLocation + UserDataFile,
                        JSON.stringify({
                            provider: '',
                            defaultSaveLocation: '',
                        }),
                    );
                }
            },
            readSettingsFile(settings) {
                if (settings.provider) {
                    this.provider = settings.provider;
                }
                if (settings.defaultSaveLocation) {
                    this.defaultSaveLocation = settings.defaultSaveLocation;
                } else {
                    this.useDefaultSaveLocation = false;
                }
            },
            writeSettingsFile(setting) {
                fs.readFile(this.userDataLocation + UserDataFile, (err, data) => {
                    if (err) {
                        let errorMessage = functions.handleErrors(err);
                        this.showDialog('Error', errorMessage);
                    } else {
                        data = JSON.parse(data);
                        data[setting[0]] = setting[1];
                        fs.writeFileSync(
                            this.userDataLocation + UserDataFile,
                            JSON.stringify(data),
                        );
                    }
                });
            },
            askForDefaultSaveLocation() {
                this.$electron.ipcRenderer.send('open-directory-dialog');
            },
            resetDefaultSaveLocation() {
                if (!this.useDefaultSaveLocation) {
                    this.$store.commit('setDefaultSaveLocation', '');
                    this.writeSettingsFile(['defaultSaveLocation', '']);
                }
            },
        }
    }
</script>

<style scoped>

</style>
