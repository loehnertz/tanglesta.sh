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
        methods: {}
    }
</script>

<style scoped>

</style>
