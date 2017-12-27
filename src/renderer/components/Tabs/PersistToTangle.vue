<template>
    <section>
        <div id="inital-inputs">
            <div class="field has-addons">
                <div class="file has-name is-expanded is-medium" id="file-container" v-on:click="openFileDialog()">
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
                    <a class="button is-primary is-medium">
                        Persist
                    </a>
                </div>
            </div>
            <div class="field has-addons">
                <p class="control has-icons-left is-expanded">
                    <input class="input" type="password" placeholder="Password" :disabled="!isEncrypted">
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
        <progress class="progress is-primary is-medium" :value="progessPercentage" max="100" v-show="isPersisting">
            {{ progessPercentage }}%
        </progress>
        <div class="notification" v-show="isPersisting">
            Estimated Remaining Time: <span id="remaining-time">{{ remainingTime }}</span>
        </div>
        <div class="control">
            <textarea class="textarea" title="result" readonly v-show="dataPersisted"></textarea>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'persist-to-tangle',
        data() {
            return ({
                isEncrypted: false,
                isPersisting: true,
                dataPersisted: false,
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
            }
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

    #inital-inputs {
        margin-bottom: 4rem;
    }

    #remaining-time {
        font-weight: bold;
    }
</style>
