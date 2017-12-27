<template>
    <section>
        <div id="inital-inputs">
            <div class="field has-addons">
                <p class="control has-icons-left is-expanded">
                    <input class="input is-large" type="text" placeholder="Entry-Hash">
                    <span class="icon is-small is-left">
                    <i class="fa fa-hashtag"></i>
                </span>
                </p>
                <div class="control">
                    <a class="button is-primary is-large">
                        Retrieve
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
        <progress class="progress is-primary is-medium" value="15" max="100" v-show="isRetrieving">30%</progress>
        <div class="notification" v-show="isRetrieving">
            Estimated Remaining Time: <span id="remaining-time">{{ remainingTime }}</span>
        </div>
        <div class="control">
            <textarea class="textarea" title="result" readonly v-show="resultRetrieved"></textarea>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'retrieve-from-tangle',
        data() {
            return ({
                isEncrypted: false,
                isRetrieving: true,
                resultRetrieved: false,
                remainingTime: '00:00:00',
            });
        },
        methods: {}
    }
</script>

<style scoped>
    #inital-inputs {
        margin-bottom: 4rem;
    }

    #remaining-time {
        font-weight: bold;
    }
</style>
