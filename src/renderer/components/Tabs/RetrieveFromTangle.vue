<template>
    <section>
        <div class="box">
            <div class="field has-addons">
                <p class="control has-icons-left is-expanded" v-bind:class="{'is-loading': isRetrieving}">
                    <input class="input is-primary is-medium" type="text" placeholder="Entry-Hash" v-model="entryHash">
                    <span class="icon is-small is-left">
                        <i class="fa fa-hashtag"></i>
                    </span>
                </p>
                <div class="control">
                    <a class="button is-primary is-medium" v-on:click="retrieve">
                        Retrieve
                    </a>
                </div>
            </div>
            <div class="field has-addons">
                <p class="control has-icons-left is-expanded">
                    <input class="input" :type="!isPasswordVisible ? 'text' : 'password'" placeholder="Password"
                           v-model="password"
                           :disabled="!isEncrypted"
                    >
                    <span class="icon is-small is-left">
                        <i class="fa fa-lock"></i>
                    </span>
                </p>
                <p class="control">
                    <button class="button" :disabled="!isEncrypted" v-on:click="setPasswordVisibility">
                        <span class="icon">
                            <i :class="passwordInputClasses"></i>
                        </span>
                    </button>
                </p>
                <p class="control">
                    <span class="select">
                        <select title="isEncrypted"
                                v-model="isEncrypted"
                                v-on:change="!isEncrypted ? password = '' : null"
                        >
                            <option :value="false">not encrypted</option>
                            <option :value="true">encrypted</option>
                        </select>
                    </span>
                </p>
            </div>
        </div>
        <div class="box" v-show="isRetrieving">
            <progress class="progress is-primary is-medium" :value="progessPercentage" max="100">
                {{ progessPercentage }}%
            </progress>
            <div class="notification">
                Estimated Remaining Time: <span id="remaining-time">{{ remainingTime }}</span>
            </div>
        </div>
        <div class="box" v-show="doneRetrieving">
            <label class="label">Saved File</label>
            <div class="notification">
                <span id="file-path" v-on:click="openFilePath">{{ saveFilePath }}</span>
            </div>
        </div>
        <v-dialog/>
    </section>
</template>

<script>
    import fs from 'fs';
    import functions from '../../functions'

    export default {
        name: 'retrieve-from-tangle',
        data() {
            return ({
                entryHash: '',
                password: '',
                passwordInputClasses: '',
                isPasswordVisible: false,
                isEncrypted: false,
                isRetrieving: false,
                doneRetrieving: false,
                markyEntries: [],
                progessPercentage: 0,
                remainingTime: '00:00:00',
                saveFilePath: null,
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
            this.$electron.ipcRenderer.on('selected-save-location', (event, path) => {
                if (path) {
                    this.saveFilePath = path;
                } else {
                    this.saveFilePath = null;
                    this.isRetrieving = false;
                    this.doneRetrieving = false;
                }
            });

            this.setPasswordVisibility();
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
            openFilePath() {
                this.$electron.shell.showItemInFolder(this.saveFilePath ? this.saveFilePath : '');
            },
            setPasswordVisibility() {
                if (this.isPasswordVisible) {
                    this.passwordInputClasses = 'fa fa-eye-slash';
                } else {
                    this.passwordInputClasses = 'fa fa-eye';
                }
                this.isPasswordVisible = !this.isPasswordVisible;
            },
            saveRetrievedFile(buffer) {
                let saveFileLoop = setInterval(() => {
                    if (this.saveFilePath) {
                        clearInterval(saveFileLoop);
                        fs.writeFileSync(this.saveFilePath, buffer);
                    }
                }, 1234);
            },
            async retrieve() {
                this.saveFilePath = null;
                this.doneRetrieving = false;
                this.isRetrieving = true;

                this.tanglestash = functions.tanglestash(this.provider, this.seed);

                let timeElapsed = 0;
                let markyReadoutLoopInterval = 420;  // Always in milliseconds
                let markyReadoutLoop = setInterval(() => {
                    this.markyEntries = this.tanglestash.getAllMarkyEntries();
                    let progressAndRemainingTime = functions.calculateProgessAndRemainingTime(
                        this.tanglestash.currentChunkPosition,
                        this.tanglestash.totalChunkAmount,
                        this.markyEntries,
                        timeElapsed,
                    );
                    this.progessPercentage = progressAndRemainingTime.progressPercentage;
                    this.remainingTime = progressAndRemainingTime.remainingTime;
                    timeElapsed += markyReadoutLoopInterval;
                }, markyReadoutLoopInterval);

                try {
                    let content = await this.tanglestash.readFromTangle(this.entryHash, this.password);
                    this.$electron.ipcRenderer.send('open-save-dialog', this.defaultSaveLocation);
                    this.saveRetrievedFile(content);
                    this.doneRetrieving = true;
                } catch (err) {
                    let errorMessage = functions.handleErrors(err);
                    this.showDialog('Error', errorMessage);
                    this.doneRetrieving = false;
                }

                this.isRetrieving = false;
                clearInterval(markyReadoutLoop);
            },
        }
    }
</script>

<style scoped>
    #remaining-time {
        font-weight: bold;
    }

    #file-path {
        color: #00d1b2;
        cursor: pointer;
    }

    /* Overwriting Bulma's default styles for these */
    .control.is-loading::after {
        top: 1.025em;
    }
</style>
