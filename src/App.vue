<template>
    <div id="app" class="row-container" :style="appStyle">
        <div class="frame-top">.</div>
        <div class="frame-medium col-container">
            <div class="frame-left" :style="frameLeft">.</div>
            <div class="frame-main" :style="frameMain"><router-view /></div>
            <div class="frame-right" :style="frameRight">.</div>
        </div>
        <div class="frame-bottom">.</div>
        <!-- Logo -->
        <a 
            href="https://github.com/zhmhbest/LocalBookmark"
            target="_blank"
            style="position: fixed; right: 15px; top: 15px; line-height: 1"
        ><svg width="32" height="32" viewBox="0 0 16 16" version="1.1" aria-hidden="true">
                <path style="fill: white"
                    fill-rule="evenodd"
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z">
                </path>
        </svg></a>
    </div>
</template>

<script lang="ts">
import $$ from "./library";
export default $$.Vue.extend({
    name: "app",
    data() {
        return {
            appStyle: {} as {fontSize: string},
            frameLeft: {} as {width: string},
            frameMain: {} as {width: string},
            frameRight: {} as {width: string}
        }
    },
    mounted() {
        this.balanceFrame();
        // 根据页面重新平衡框架
        window.onresize = () =>  {
            this.balanceFrame();
        };
    },
    methods: {
        balanceFrame() {
            const clientWidth: number = document.documentElement.clientWidth;
            const clientHeight: number = document.documentElement.clientHeight;
            let frameTopHeight: number = 100;
            let frameBottomHeight: number = 50;
            let frameMediumHeight: number = clientHeight - frameTopHeight - frameBottomHeight;
            // 移动设备模式
            if(clientWidth < 1000) {
                this.appStyle.fontSize = `6px`;
                this.frameLeft.width = `2%`;
                this.frameMain.width = `96%`;
                this.frameRight.width = `2%`;
            } else {
                this.appStyle.fontSize = `9px`;
                this.frameLeft.width = `12%`;
                this.frameMain.width = `76%`;
                this.frameRight.width = `12%`;
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
