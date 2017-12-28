<template>
    <section>
        <div class="box">
            <div class="field has-addons">
                <p class="control has-icons-left is-expanded">
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
                    <select title="isEncrypted" v-model="isEncrypted">
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
    </section>
</template>

<script>
    import fs from 'fs';
    import {
        Tanglestash,
        IncorrectPasswordError,
        IncorrentDatatypeError,
        IncorrectTransactionHashError,
        NodeOutdatedError,
    } from 'tanglestash'

    export default {
        name: 'retrieve-from-tangle',
        data() {
            return ({
                entryHash: '',
                password: '',
                passwordInputClasses: '',
                isPasswordVisible: false,
                isEncrypted: false,
                isRetrieving: true,
                doneRetrieving: true,
                markyEntries: [],
                progessPercentage: 0,
                remainingTime: '00:00:00',
                saveFilePath: '',
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
        },
        mounted() {
            this.$electron.ipcRenderer.on('selected-save-location', (event, path) => {
                if (path) {
                    this.saveFilePath = path;
                } else {
                    // TODO: Show error message to select proper path
                }
            });

            this.setupTanglestash();
            this.setPasswordVisibility();
        },
        methods: {
            setupTanglestash() {
                this.tanglestash = new Tanglestash(this.provider, 'file');
            },
            openFilePath() {
                this.$electron.shell.showItemInFolder(this.saveFilePath);
            },
            setPasswordVisibility() {
                if (this.isPasswordVisible) {
                    this.passwordInputClasses = 'fa fa-eye-slash';
                } else {
                    this.passwordInputClasses = 'fa fa-eye';
                }
                this.isPasswordVisible = !this.isPasswordVisible;
            },
            handleErrors(err) {
                // TODO: Switch to modal error messages
                switch (err.name) {
                    case new IncorrectPasswordError().name:
                        console.error("The provided password is not correct!", err.message);
                        break;
                    case new IncorrentDatatypeError().name:
                        console.error("The provided datatype does not exist!", err.message);
                        break;
                    case new IncorrectTransactionHashError().name:
                        console.error("The provided entry-hash is not valid!", err.message);
                        break;
                    case new NodeOutdatedError().name:
                        console.error("The provided node is outdated!", err.message);
                        break;
                    default:
                        console.error("An unidentified error occured!", err);
                        break;
                }
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
                let markyReadoutLoop = setInterval(() => {
                    this.markyEntries = this.tanglestash.getAllMarkyEntries();
                }, 1234);

                try {
                    let content = await this.tanglestash.readFromTangle(this.entryHash, this.password);
                    clearInterval(markyReadoutLoop);
                    this.$electron.ipcRenderer.send('open-save-dialog');
                    this.saveRetrievedFile(content);
                } catch (err) {
                    clearInterval(markyReadoutLoop);
                    this.handleErrors(err);
                }
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
</style>
