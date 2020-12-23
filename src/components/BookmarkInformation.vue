<template>
    <div class="row-container">
        <div class="col-container headline">
            <a-avatar shape="square">{{title}}</a-avatar>
            <div>{{title}}</div>
            <div>
                <a-tag v-for="item of tag" :key="item"
                    color="pink">{{item}}</a-tag>
            </div>
        </div>
        <div>{{desc}}</div>
    </div>
</template>

<script lang="ts">
import $$ from "../library";
export default $$.Vue.extend({
    name: "BookmarkInformation",
    props: ["title", "url", "tag", "desc"], //组建接受的属性值
    data() {
        return {};
    },
    methods: {
    },
});
</script>

<style lang="scss" scoped>
</style>
