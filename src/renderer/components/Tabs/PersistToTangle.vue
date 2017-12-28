<template>
    <section>
        <div class="box">
            <div class="field has-addons">
                <div class="file control has-name is-expanded is-primary is-medium" id="file-container"
                     v-on:click="askForFileToPersist"
                     v-bind:class="{'is-loading': isPersisting}"
                >
                    <label class="file-label" id="file-label">
                            <span class="file-cta" id="file-cta">
                                <span class="file-icon">
                                    <i class="fa fa-upload"></i>
                                </span>
                                <span class="file-label">
                                    Choose File
                                </span>
                            </span>
                        <span class="file-name" id="file-name">
                            {{ selectedFileName }}
                        </span>
                    </label>
                </div>
                <div class="control">
                    <a class="button is-primary is-medium" v-on:click="persist">
                        Persist
                    </a>
                </div>
            </div>
            <div class="field has-addons">
                <p class="control has-icons-left is-expanded">
                    <input class="input"
                           :type="!isPasswordVisible ? 'text' : 'password'" placeholder="Password"
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
        <div class="box" v-show="isPersisting">
            <progress class="progress is-primary is-medium" :value="progessPercentage" max="100">
                {{ progessPercentage }}%
            </progress>
            <div class="notification">
                Estimated Remaining Time: <span id="remaining-time">{{ remainingTime }}</span>
            </div>
        </div>
        <div class="box" v-show="donePersisting">
            <div class="control">
                <label class="label">Entry-Hash</label>
                <textarea id="entry-hash" class="textarea is-hovered is-large" title="entry-hash" readonly
                          v-model="entryHash"
                          v-on:focus="$event.target.select()"
                ></textarea>
            </div>
        </div>
    </section>
</template>

<script>
    import functions from '../../functions'

    export default {
        name: 'persist-to-tangle',
        data() {
            return ({
                selectedFilePath: '',
                selectedFileName: '',
                password: '',
                passwordInputClasses: '',
                isPasswordVisible: false,
                isEncrypted: false,
                isPersisting: false,
                donePersisting: false,
                markyEntries: [],
                progessPercentage: 0,
                remainingTime: '00:00:00',
                entryHash: '',
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
        },
        mounted() {
            this.$electron.ipcRenderer.on('selected-file', (event, path) => {
                this.selectedFilePath = path[0];
                this.getFileName(path[0]);
            });

            this.setPasswordVisibility();
        },
        methods: {
            askForFileToPersist() {
                this.isPersisting = false;
                this.donePersisting = false;
                this.entryHash = '';
                this.$electron.ipcRenderer.send('open-file-dialog');
            },
            getFileName(filePath) {
                let filePathArray = filePath.split('/');  // TODO: Check if Windows needs backslashes here
                this.selectedFileName = filePathArray[filePathArray.length - 1];
            },
            setPasswordVisibility() {
                if (this.isPasswordVisible) {
                    this.passwordInputClasses = 'fa fa-eye-slash';
                } else {
                    this.passwordInputClasses = 'fa fa-eye';
                }
                this.isPasswordVisible = !this.isPasswordVisible;
            },
            async persist() {
                this.donePersisting = false;
                this.isPersisting = true;

                this.tanglestash = functions.tanglestash(this.provider, this.seed);

                let markyReadoutLoop = setInterval(() => {
                    this.markyEntries = this.tanglestash.getAllMarkyEntries();
                }, 1234);

                try {
                    this.entryHash = await this.tanglestash.saveToTangle(this.selectedFilePath, this.password);
                } catch (err) {
                    functions.handleErrors(err);
                }

                clearInterval(markyReadoutLoop);
                this.isPersisting = false;
                this.donePersisting = true;
            },
        }
    }
</script>

<style scoped>
    #file-container, #file-label {
        flex: 1;
    }

    #file-cta {
        flex: 1;
        justify-content: center;
    }

    #file-name {
        flex: 2;
        border-radius: 0;
    }

    #remaining-time {
        font-weight: bold;
    }

    #entry-hash {
        height: 142px;
    }

    /* Overwriting Bulma's default styles for these */
    .control.is-loading::after {
        top: 0.725em;
    }
</style>
