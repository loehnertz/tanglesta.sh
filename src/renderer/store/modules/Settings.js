const state = {
    provider: '',
    seed: '',
    defaultSaveLocation: '',
};

const mutations = {
    setProvider(state, provider) {
        state.provider = provider;
    },
    setSeed(state, seed) {
        state.seed = seed;
    },
    setDefaultSaveLocation(state, defaultSaveLocation) {
        state.defaultSaveLocation = defaultSaveLocation;
    },
};

const actions = {};

export default {
    state,
    mutations,
    actions
}
