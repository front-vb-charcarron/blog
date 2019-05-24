// WORLD

import {
    cards,
    pile
} from '@/views/game/cards';

let handSize = 5;
let currentPlayingCard = null;
let cardUid = 0;
let maxHealth = 10;
let maxFood = 10

let state = {
    // UI 用户界面
    activeOverlay: null,
    // World
    worldRatio: getWorldRatio(),
    // Game
    turn: 1,
    players: [{
            name: "Anne of Cleves",
            // 游戏开始时状态
            food: 10,
            health: 10,
            // 是否跳过下一个回合
            skipTurn: false,
            // 跳过了上一个回合
            skippedTurn: false,
            hand: [],
            lastPlayedCardId: null,
            dead: false
        },
        {
            name: "William the Bald",
            // 游戏开始时状态
            food: 10,
            health: 10,
            // 是否跳过下一个回合
            skipTurn: false,
            // 跳过了上一个回合
            skippedTurn: false,
            hand: [],
            lastPlayedCardId: null,
            dead: false
        }
    ],
    currentPlayerIndex: Math.round(Math.random()),
    get currentPlayer() {
        return this.players[this.currentPlayerIndex];
    },
    get currentOpponentId() {
        return this.currentPlayerIndex === 0 ? 1 : 0;
    },
    get currentOpponent() { // 当前对手
        return this.players[this.currentOpponentId];
    },
    get currentHand() { // 当前手牌
        return this.currentPlayer.hand;
    },
    drawPile: pile, // 抽牌堆
    discardPile: {}, // 弃牌堆
    canPlay: true // 防止重复出牌
};

// 关闭弹层的映射
const overlayCloseHandler = {
    'player-turn'() {
        if (state.turn > 1) {
            state.activeOverlay = 'last-play';
        } else {
            newTurn();
        }
    },
    'last-play'() {
        newTurn();
    },
    'game-over'() {
        document.location.reload();
    }
};

export {
    state,
    maxHealth,
    maxFood,
    overlayCloseHandler
};

// 获取渲染比例
export function getWorldRatio() {
    return 1 / 1920 * window.innerWidth
}

// 获取上一回合玩家出的牌
export function getLastedPlayedCard(player) {
    return cards[player.lastPlayedCardId];
}

// 初始化手牌
export function drawInitialHand(player) {
    for (let i = 0; i < handSize; i++) {
        player.hand.push(drawCard());
    }
}

// 移除手牌
export function playCard(card) {
    console.log('card: ', card);
    if (state.canPlay) {
        state.canPlay = false;
        currentPlayingCard = card;

        const index = state.currentPlayer.hand.indexOf(card);
        state.currentPlayer.hand.splice(index, 1);
        console.log('state.currentPlayer.hand: ', state.currentPlayer.hand);
    }
}

// 手牌生效
export function applyCard() {
    const card = currentPlayingCard;
    applyCardEffect(card);
    setTimeout( () => {
        state.players.forEach(checkPlayerLost);
        
        if (isOnePlayerDead()) {
            endGame();
        } else {
            nextTurn();
        }

    }, 700);
}

// 生成一张手牌
function drawCard() {
    if (getDrawPileCount() === 0) {
        refillPile();
    }

    const choice = Math.round(Math.random() * getDrawPileCount() - 1) + 1;
    let accumulation = 0;

    for (let k in state.drawPile) {
        accumulation += state.drawPile[k];
        if (choice <= accumulation) {
            state.drawPile[k]--;
            return {
                id: k,
                uid: cardUid++,
                def: cards[k]
            };
        }
    }
}

// 计算抽牌堆里手牌数量
function getDrawPileCount() {
    let result = 0;
    for (let k in state.drawPile) {
        result += state.drawPile[k];
    }
    return result;
}

// 把弃牌堆里的牌倒到抽牌堆
function refillPile() {
    Object.assign(state.drawPile, state.discardPile);
    state.discardPile = {};
}

// 打出的手牌生效
function applyCardEffect(card) {
    state.currentPlayer.lastPlayedCardId = card.id;
    card.def.play(state.currentPlayer, state.currentOpponent);
    state.players.forEach(checkStatsBounds);
}

// 检查 Health 和 Food 有没有超出范围
function checkStatsBounds(player) {
    //  Health
    if (player.health < 0) {
        player.health = 0;
    } else if (player.health > maxHealth) {
        player.health = maxHealth;
    }

    // Food
    if (player.food < 0) {
        player.food = 0;
    } else if (player.food > maxFood) {
        player.food = maxFood;
    }
}

// 检查玩家 Health 或 food 清零
function checkPlayerLost(player) {
    player.dead = player.food === 0 || player.health === 0;
}

// 检查是否有玩家死亡
function isOnePlayerDead() {
    return state.players.some(p => p.dead);
}

// 下个回合
function nextTurn() {
    state.turn++ ;
    state.currentPlayerIndex = state.currentOpponentId;
    state.activeOverlay = 'player-turn'; 
}

// 游戏结束
function endGame() {
    state.activeOverlay = 'game-over';
}

function newTurn() {
    state.activeOverlay = null;
    if (state.currentPlayer.skipTurn) {
        skipTurn();
    } else {
        startTurn();
    }
}

function skipTurn() {
    state.currentPlayer.skippedTurn = true;
    state.currentPlayer.skipTurn = false;
    state.canPlay = true;
}

function startTurn() {
    state.currentPlayer.skippedTurn = false;
    console.log('state.turn: ', state.turn);
    if (state.turn > 2) {
        setTimeout(() => {
            state.currentPlayer.hand.push(drawCard());
            state.canPlay = true;
        }, 800);
    } else {
        state.canPlay = true;
    }

    console.log('state.canPlay: ', state.canPlay);
}