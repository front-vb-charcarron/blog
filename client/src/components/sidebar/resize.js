
import { isMobile } from '@/utils/isMobile';

export default {
    beforeMount () {
        this.resizeHandler();
        window.addEventListener('resize', this.resizeHandler);
    },
    methods: {
        isMobile,
        resizeHandler() {
            this.$store.dispatch('toggleDevice', this.isMobile());
        }
    },
    
};