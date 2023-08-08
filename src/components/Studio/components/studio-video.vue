<template>
    <div>
        <!-- 播放器 -->
        <div class="the_video" ref="video" :id="`J_prismPlayer${1}`">
            <!-- <div class="videoControl" @click.stop="toggleState"></div> -->
        </div>
        <!-- 封面 -->

    </div>
</template>
<script lang="ts" setup name="StudioVideo">
import { onMounted } from 'vue';
// import { useUserStore } from '@/store/modules/user';
const player: any = ref();
onMounted(() => {
    player.value = new Aliplayer(
        {
            id: `J_prismPlayer${1}`,
            source: 'http://hdlbs.kiwishowlive.com/live/712700190_1691478103.m3u8',
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
                // handleSubscribe();
            });
            let dom = document.querySelector(`#J_prismPlayer${1} video`);
            dom?.setAttribute('x-webkit-airplay', 'true');
            dom?.setAttribute('x5-video-player-type', 'h5');
            dom?.setAttribute('x5-video-player-fullscreen', 'true');
            dom?.setAttribute('x5-video-ignore-metadata', 'true');
            dom?.setAttribute('x5-video-orientation', 'portrait');
            dom?.setAttribute('webkit-playsinline', '');
            dom?.setAttribute('playsinline', '');
            dom?.setAttribute('style', 'object-fit:fill;width:100%;height:100%');
        },
    );
});
</script>
<style scoped lang='scss'>
.the_video {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    // #v_media {
    //     width: 100%;
    //     height: 95%;
    // }
}

#poster {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url('@/assets/authorDetail/bg.png') no-repeat center center;
    background-size: cover;
}
</style>