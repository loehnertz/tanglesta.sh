<template>
    <section>
        <div class="box">
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input is-medium" type="text" placeholder="Node-Provider"
                           v-model="provider"
                           v-on:keyup="commitMutation('setProvider', provider)"
                    >
                    <span class="icon is-small is-left">
                        <i class="fa fa-server"></i>
                    </span>
                </p>
            </div>
        </div>
        <div class="box">
            <div class="field has-addons">
                <p class="control has-icons-left is-expanded">
                    <input class="input is-medium" type="text" placeholder="Seed"
                           v-model="seed"
                           v-on:keyup="commitMutation('setSeed', seed)"
                           :disabled="autoSeed"
                    >
                    <span class="icon is-small is-left">
                        <i class="fa fa-cubes"></i>
                    </span>
                </p>
                <p class="control">
                    <span class="select is-medium">
                        <select title="isEncrypted" v-model="autoSeed">
                            <option :value="true">automatic seed</option>
                            <option :value="false">custom seed</option>
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
                provider: '',
                seed: '',
                autoSeed: true,
            });
        },
        methods: {
            commitMutation(mutation, payload) {
                this.$store.commit(mutation, payload);
            }
        }
    }
</script>

<style scoped>

</style>
