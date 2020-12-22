<template>
    <div id="app">
        <div class="frame-top">
            <span>.</span>
        </div>
        <div class="frame-medium">
            <div class="frame-left"></div>
            <div class="frame-main"><router-view /></div>
            <div class="frame-right"></div>
        </div>
        <div class="frame-bottom">
            <span>.</span>
        </div>
    </div>
</template>

<script lang="ts">
import $$ from "./library";
export default $$.Vue.extend({
    name: "app",
    mounted() {
        // @ts-ignore
        document.querySelector("#app").style[
            "height"
        ] = `${document.documentElement.clientHeight}px`;
    },
});
</script>

<style lang="scss" scoped>
#app {
    display: flex;
    flex-direction: column;
    background-color: gray;
    .frame-top {
        display: flex;
        background-color: palevioletred;
    }
    .frame-bottom {
        display: flex;
        background-color: cornflowerblue;
    }
    .frame-medium {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
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
        // background-color: gray;
    }
    .frame-right {
        display: inline-block;
        width: 10%;
        // background-color: powderblue;
    }
}
</style>
