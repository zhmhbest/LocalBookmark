<template>
    <div id="app" class="row-container">
        <div class="frame-top">.</div>
        <div class="frame-medium col-container">
            <div class="frame-left">.</div>
            <div class="frame-main"><router-view /></div>
            <div class="frame-right">.</div>
        </div>
        <div class="frame-bottom">.</div>
    </div>
</template>

<script lang="ts">
import $$ from "./library";
export default $$.Vue.extend({
    name: "app",
    mounted() {
        this.balanceFrame();
    },
    methods: {
        balanceFrame() {
            const clientHeight: number = document.documentElement.clientHeight;
            const frameTopHeight: number = 50;
            const frameBottomHeight: number = 50;
            const frameMediumHeight: number = clientHeight - frameTopHeight - frameBottomHeight;
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
    font-size: 9px;

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
        width: 10%;
        // background-color: peru;
    }
    .frame-main {
        display: inline-block;
        width: 80%;
        overflow-x: hidden;
        overflow-y: auto;
    }
    .frame-right {
        display: inline-block;
        width: 10%;
        // background-color: powderblue;
    }
}
</style>
