<template>
    <section>
        <div class="box">
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input is-medium" type="text" placeholder="Node-Provider" v-model="node">
                    <span class="icon is-small is-left">
                        <i class="fa fa-server"></i>
                    </span>
                </p>
            </div>
        </div>
        <div class="box">
            <div class="field has-addons">
                <p class="control has-icons-left is-expanded">
                    <input class="input is-medium" type="text" placeholder="Seed" v-model="seed"
                           :disabled="autoSeed">
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
                node: '',
                seed: '',
                autoSeed: true,
            });
        },
        methods: {}
    }
</script>

<style scoped>

</style>
