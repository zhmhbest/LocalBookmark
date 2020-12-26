<template>
    <div id="app" class="row-container" :style="appStyle">
        <div class="frame-top">.</div>
        <div class="frame-medium col-container">
            <div class="frame-left" :style="frameLeft">.</div>
            <div class="frame-main" :style="frameMain"><router-view /></div>
            <div class="frame-right" :style="frameRight">.</div>
        </div>
        <div class="frame-bottom">.</div>
    </div>
</template>

<script lang="ts">
import $$ from "./library";
export default $$.Vue.extend({
    name: "app",
    data() {
        return {
            appStyle: {fontSize: '9px'},
            frameLeft: {width: '10%'},
            frameMain: {width: '80%'},
            frameRight: {width: '10%'}
        }
    },
    mounted() {
        this.balanceFrame();
    },
    methods: {
        balanceFrame() {
            const clientWidth: number = document.documentElement.clientWidth;
            const clientHeight: number = document.documentElement.clientHeight;
            let frameTopHeight: number = 50;
            let frameBottomHeight: number = 50;
            let frameMediumHeight: number = clientHeight - frameTopHeight - frameBottomHeight;
            // 移动设备模式
            if(clientWidth < 1000) {
                this.appStyle.fontSize = `2px`;
                this.frameLeft.width = `2%`;
                this.frameMain.width = `96%`;
                this.frameRight.width = `2%`;
            }
            //
            const App: HTMLDivElement = document.querySelector("#app");
            const Top: HTMLDivElement = document.querySelector(".frame-top");
            const Bottom: HTMLDivElement = document.querySelector(".frame-bottom");
            const Medium: HTMLDivElement = document.querySelector(".frame-medium");
            // const Left: HTMLDivElement = document.querySelector(".frame-left");
            // const Right: HTMLDivElement = document.querySelector(".frame-right");
            //
            App.style.height = `${clientHeight}px`;
            Top.style.height = `${frameTopHeight}px`;
            Bottom.style.height = `${frameBottomHeight}px`;
            Medium.style.height = `${frameMediumHeight}px`;
        }
    }
});
</script>

<style lang="scss" scoped>
#app {
    background-color: rgb(30, 30, 30);
    color: #777;
    // font-size: 9px;

    .frame-top {
        display: flex;
        // background-color: palevioletred;
    }
    .frame-bottom {
        display: flex;
        // background-color: cornflowerblue;
    }
    .frame-medium {
        flex-wrap: nowrap;
        justify-content: space-between;
        height: 100%;
    }
    .frame-left {
        display: inline-block;
        // width: 10%;
        // background-color: peru;
    }
    .frame-main {
        display: inline-block;
        // width: 80%;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .frame-right {
        display: inline-block;
        // width: 10%;
        // background-color: powderblue;
    }
}
</style>
