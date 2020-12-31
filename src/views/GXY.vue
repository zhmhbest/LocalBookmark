<template>
    <iframe src="static/pages/gxy/index.html"></iframe>
</template>

<script lang="ts">
// http://localhost:9000/static/pages/gxy/index.html
import $$ from "../library";
export default $$.Vue.extend({
    mounted() {
        console.log("GXY");
    }
});
</script>

<style lang="scss" scoped>
iframe {
    height: 99%;
    width: 99%;
    border: 0;
    overflow: hidden
}
</style>
