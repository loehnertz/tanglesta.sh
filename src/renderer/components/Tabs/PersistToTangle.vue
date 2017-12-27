<template>
    <section>
        <div class="box">
            <div class="field has-addons">
                <div class="file has-name is-expanded is-primary is-medium" id="file-container" v-on:click="openFileDialog()">
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
                    <input class="input" type="password" placeholder="Password" v-model="password"
                           :disabled="!isEncrypted">
                    <span class="icon is-small is-left">
                        <i class="fa fa-lock"></i>
                    </span>
                </p>
                <p class="control">
                    <span class="select">
                        <select title="isEncrypted" v-model="isEncrypted">
                            <option value="false">not encrypted</option>
                            <option value="true">encrypted</option>
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
        <div class="box" v-show="dataPersisted">
            <div class="control">
                <label class="label">Entry-Hash</label>
                <textarea id="entry-hash" class="textarea is-hovered is-large" title="entry-hash" readonly></textarea>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'persist-to-tangle',
        data() {
            return ({
                isEncrypted: false,  // TODO: Toggling the property does not disable the password input sometimes
                password: '',
                isPersisting: true,
                dataPersisted: true,
                progessPercentage: 0,
                remainingTime: '00:00:00',
                selectedFilePath: '',
                selectedFileName: '',
            });
        },
        mounted() {
            this.$electron.ipcRenderer.on('selected-directory', (event, path) => {
                this.selectedFilePath = path[0];
                this.getFileName(path[0]);
            });
        },
        methods: {
            openFileDialog() {
                this.$electron.ipcRenderer.send('open-file-dialog');
            },
            getFileName(filePath) {
                let filePathArray = filePath.split('/');  // TODO: Check if Windows needs backslashes here
                this.selectedFileName = filePathArray[filePathArray.length - 1];
            },
            persist() {

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
        min-height: 0;
        max-height: 100px;
        height: 100px;
    }
</style>
