<template>
    <div>
        <div v-if="opponent.skippedTurn">{{ opponent.name }} turn was skipped!</div>
        <template v-else>
            <div>{{ opponent.name }} just played:</div>
            <card :def="lastPlayedCard"/>
        </template>
    </div>
</template>
<script>
import card from '@/components/game/card.vue';
import { getLastedPlayedCard } from '@/utils/gameUtils';

export default {
    props: ['opponent'],
    components: {
        card
    },
    computed: {
        lastPlayedCard() {
            return getLastedPlayedCard(this.opponent);
        }
    }
}
</script>
