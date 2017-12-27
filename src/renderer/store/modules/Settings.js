const state = {
    provider: '',
    seed: '',
};

const mutations = {
    setProvider(state, provider) {
        state.provider = provider;
    },
    setSeed(state, seed) {
        state.seed = seed;
    },
};

const actions = {};

export default {
    state,
    mutations,
    actions
}
