<template>
    <div ref="video" :id="`J_prismPlayer${id}`">
        <div class="videoControl" @click.stop="toggleState"></div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';

const { url, id } = defineProps({
    url: {
        type: String,
    },
    id: {
        type: Number,
    },
});
const player: any = ref();
onMounted(() => {
    player.value = new Aliplayer(
        {
            id: `J_prismPlayer${id}`,
            source: url,
            width: '100%',
            height: '100%',
            autoplay: true,
            preload: true,
            controlBarVisibility: 'always',
            useH5Prism: true,
            playsinline: false,
            // definition: "",
            // defaultDefinition: "1080",
            extraInfo: {
                crossOrigin: 'anonymous',
            },
            skinLayout: [
                { name: 'bigPlayButton', align: 'blabs', x: '50%', y: '50%' },
                { name: 'H5Loading', align: 'cc' },
                // { name: "errorDisplay", align: "tlabs", x: 0, y: 0 },
                // { name: "infoDisplay" },
                { name: 'tooltip', align: 'blabs', x: 0, y: 56 },
                { name: 'thumbnail' },
                {
                    name: 'controlBar',
                    align: 'blabs',
                    x: 0,
                    y: 0,
                    children: [
                        { name: 'progress', align: 'blabs', x: 0, y: 0 },
                        // { name: "playButton", align: "tl", x: 15, y: 12 },
                        // { name: "timeDisplay", align: "tl", x: 10, y: 7 },
                        // { name: "fullScreenButton", align: "tr", x: 10, y: 12 },
                        // { name: "subtitle", align: "tr", x: 15, y: 12 },
                        // { name: "setting", align: "tr", x: 15, y: 12 },
                        // { name: "volume", align: "tr", x: 5, y: 10 }
                    ],
                },
            ],
        },
        function () {
            setTimeout(() => {
                handleSubscribe();
            });
            let dom = document.querySelector(`#J_prismPlayer${id} video`);
            dom?.setAttribute('x-webkit-airplay', 'true');
            dom?.setAttribute('x5-video-player-type', 'h5');
            dom?.setAttribute('x5-video-player-fullscreen', 'true');
            dom?.setAttribute('x5-video-ignore-metadata', 'true');
            dom?.setAttribute('x5-video-orientation', 'portrait');
            dom?.setAttribute('webkit-playsinline', '');
            dom?.setAttribute('playsinline', '');
        },
    );
});

function toggleState() {
    if (player?.value.getStatus() == 'playing') {
        const videobox: any = document.querySelector(`#J_prismPlayer${id} .prism-big-play-btn`);
        videobox.style.display = 'block';
        player?.value.pause();
    } else {
        player?.value.play();
    }
}
function stop() {
    if (player.value) {
        player.value._stopLoadAsPaused = true;
        player.value.loaded = true;
        player?.value.pause();
    }
}
function play() {
    if (player?.value.getStatus() == 'playing') {
        return;
    }
    if (player?.value.getStatus() == 'ready') {
        setTimeout(() => {
            player?.value.play();
        });
        return;
    }
    player?.value.play();
}

function handleSubscribe() {
    player.value.on('ended', () => {
        // next();
    });
    player.value.on('init', (e) => { });
    player.value.on('ready', (e) => { });
    player.value.on('hideBar', () => { });
    player.value.on('playing', () => { });
    player.value.on('showBar', () => { });
}
function offSubscribe() {
    player?.value.off('ended', () => { });
}
function handleDestroy() {
    player?.value.dispose();
    player.value = null;
}
</script>

<style lang="scss" scoped>
.videoControl {
    width: 100%;
    height: 95%;
    position: relative;
    z-index: 1111;
}

.progressControl {
    width: 100%;
    height: 5%;
    position: relative;
}

:deep(.prism-progress) {
    background-color: rgba(255, 255, 255, 0.2);

    .prism-progress-played {
        background-color: #ddd !important;
    }

    .prism-progress-loaded {
        background-color: rgba(255, 255, 255, 0.2) !important;
    }
}

:deep(.prism-progress-hover) {
    height: 5px;

    &.active {
        height: 15px;
    }
}

:deep(.prism-big-play-btn) {
    margin: -32px 0 0 -32px;
}

:deep(.prism-progress) {
    bottom: 3px !important;
}

:deep(.prism-controlbar) {
    height: 0px !important;
}

:deep(.prism-controlbar-bg) {
    height: 0px !important;
}

:deep(.prism-progress-cursor) {
    img {
        display: none;
    }

    background: none !important;

    &::after {
        content: '';
        position: absolute;
        top: 4px;
        right: 2px;
        height: 10px;
        width: 10px;
        border-radius: 5px;
        background-color: #fff;
    }
}
</style>
