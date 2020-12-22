<template>
    <div id="home">
        <h2>Hello Vue</h2>
        <div>
            <img alt="" src="static/images/arrow_girl.png" />
        </div>
    </div>
</template>

<script lang="ts">
import $$ from "../library";
export default $$.Vue.extend({
    name: "home",
    data() {
        return {
            hello: "Hello Home" as String,
        };
    },
    mounted() {
        console.log(this.hello);
    },
});
</script>

<style lang="scss" scoped>
#home {
    h2 {
        text-align: center;
        color: darkmagenta;
    }
    div {
        display: flex;
        justify-content: center;
    }
}
</style>
