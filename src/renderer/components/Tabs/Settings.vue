<template>
    <section>
        <div class="box">
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input is-medium" type="text" placeholder="Node-Provider" v-model="provider">
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
                           :disabled="autoSeed"
                    >
                    <span class="icon is-small is-left">
                        <i class="fa fa-cubes"></i>
                    </span>
                </p>
                <p class="control">
                    <span class="select is-medium">
                        <select title="isEncrypted" v-model="autoSeed" v-on:change="generateNewSeed">
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
                autoSeed: true,
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
            this.generateNewSeed();
        },
        methods: {
            generateNewSeed() {
                if (this.autoSeed) {
                    this.$store.commit('setSeed', 'NEWSEED');  // TODO: Implement this
                }
            },
        }
    }
</script>

<style scoped>

</style>
