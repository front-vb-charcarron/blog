<template>
    <div>
        <div class="big">Game Over</div>
        <template v-for="player in players" >
            <player-result :player="player"></player-result>
        </template>
    </div>
</template>
<script>
import playResult from './player-result.vue';
export default {
    props: ['players'],
    components: {
        'player-result': playResult
    }
}
</script>
