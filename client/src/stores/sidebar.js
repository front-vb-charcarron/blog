export default {
    state: {
        device: 'desktop',
        isCollapse: false,
        isHide: false
    },
    mutations: {
        TOGGLE_DEVICE(state, res) {
            state.device = res ? 'mobile' : 'desktop';
        },
        TOGGLE_COLLAPSE(state, res) {
            state.isCollapse = res;
        },
        TOGGLE_HIDE(state, res) {
            state.isHide = res
        }
    },
    actions: {
        toggleDevice({ commit }, isMobile) {
            commit('TOGGLE_DEVICE', isMobile);
        },
        toggleCollapse({ commit }, isCollapse) {
            commit('TOGGLE_COLLAPSE', isCollapse);
        },
        toggleHide({ commit }, isHide) {
            commit('TOGGLE_HIDE', isHide);
        }
    },
    getters: {
        isDesktop: state => {
            state.isHide = state.isCollapse;
            return state.device == 'desktop' ? true : false;
        },
        isCollapse: state => state.isCollapse,
        isHide: state => state.isHide 
    } 
}