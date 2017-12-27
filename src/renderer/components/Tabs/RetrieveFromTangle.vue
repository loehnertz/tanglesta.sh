<template>
    <section>
        <div class="box">
            <div class="field has-addons">
                <p class="control has-icons-left is-expanded">
                    <input class="input is-medium" type="text" placeholder="Entry-Hash">
                    <span class="icon is-small is-left">
                        <i class="fa fa-hashtag"></i>
                    </span>
                </p>
                <div class="control">
                    <a class="button is-primary is-medium">
                        Retrieve
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
        <div class="box" v-show="isRetrieving">
            <progress class="progress is-primary is-medium" :value="progessPercentage" max="100">
                {{ progessPercentage }}%
            </progress>
            <div class="notification">
                Estimated Remaining Time: <span id="remaining-time">{{ remainingTime }}</span>
            </div>
        </div>
        <div class="box" v-show="resultSaved">
            <label class="label">Saved File</label>
            <div class="notification">
                <span id="file-path" v-on:click="openFilePath">{{ savedFilePath }}</span>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'retrieve-from-tangle',
        data() {
            return ({
                isEncrypted: false,  // TODO: Toggling the property does not disable the password input sometimes
                password: '',
                isRetrieving: true,
                resultSaved: true,
                progessPercentage: 0,
                remainingTime: '00:00:00',
                savedFilePath: '/Users/jloehnertz/Music',
            });
        },
        methods: {
            openFilePath() {
                this.$electron.shell.showItemInFolder(this.savedFilePath);
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
