<template>
    <nut-video :id="`nut${props.id}`" :source="state.source" :options="state.options" @play="play" @pause="pause"
        @playend="playend">

    </nut-video>
    <div class="playbutton" v-if="playshow">
        <img class="playbuttonimg" :src="playbutton" alt="">
    </div>
    <!-- <div class="show" @click="select"></div> -->
</template>
<script setup  lang="ts">
import { onMounted, ref, watch } from 'vue';
import playbutton from '@/assets/opfans/paly.png'
const props = defineProps({
    url: {
        type: String,
    },
    id: {
        type: Number,
    },
    active: {
        type: Number
    },
    backimg: {
        type: String,
    }
});

const playshow = ref(false)
const nutPlay = ref()
const state = ref({
    source: {
        // src: 'https://vdo.openfans.la/85783371_1680852242.mp4?token=nKfq6mos7ja10g50ZieBUgGtF4Wl+d9lRptf/5GzwvhRTXvJpba6T6nedaaML39w2oO19VMt4tp16EyLysi4yfRl0Cma2zn2a2PKvEJDihe4nPJsB/O7YdKNghzum6M3T8EIEUN3PW+gxRB06rchE6oIN2R7aoEm8gKTlTziMas=',
        src: props.url,
        type: 'video/mp4'
    },
    options: {
        autoplay: true,
        // muted: true,
        disabled: false,
        controls: true,
        loop: true,
        // poster: props.backimg
        // playsinline: true,
    },
});
const changeVideo = (url) => {
    state.value.source = {
        src: url,
        type: 'video/mp4'
    };
};
onMounted(() => {
    nutPlay.value = document.querySelector(`#nut${props.id} .nut-video-player`)
    console.log(nutPlay.value);

    nutPlay.value.addEventListener('click', select)

    allStop()

})
const select = () => {
    if (!nutPlay.value.paused) {
        nutPlay.value.pause()
        playshow.value = true
    } else {
        nutPlay.value.play()
        playshow.value = false
    }

}
const play = () => {
    if (props.active == props.id) {
        if (nutPlay.value) {
            nutPlay.value.play()
            playshow.value = false
        }
    } else {
        if (nutPlay.value) {
            nutPlay.value.pause()
            playshow.value = true
        }
    }
};

const allStop = () => {
    if (nutPlay.value) {
        nutPlay.value.pause()
        play()
    }
}
const pause = (elm: any) => {
    playshow.value = true
};
const playend = (elm: any) => console.log('playend', elm);
watch(
    () => props.url,
    () => {
        changeVideo(props.url)
    },
);
watch(
    () => props.active,
    () => {

        allStop()
    },
);
defineExpose({
    select
});
</script>
<style lang="scss" scoped>
.show {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}



.playbutton {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 80%;
    display: flex;
    z-index: 0;
    align-items: center;
    justify-content: center;

    .playbuttonimg {
        z-index: 10;
        width: 200px;
        height: 200px;
        margin-top: 100px;
    }
}
</style>