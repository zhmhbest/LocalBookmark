<template>
    <div class="row-container bookmark">
        <div class="col-container headline">
            <a-avatar
                shape="square"
                :size="48"
                :style="{
                    backgroundColor: avatarColor,
                    verticalAlign: 'middle',
                }"
                >{{ title }}</a-avatar
            >
            <div class="title vertical-center">{{ title }}</div>
            <div class="vertical-bottom">
                <a-tag v-for="item of tag" :key="item">{{ item }}</a-tag>
            </div>
            <a slot="extra" href="#" @click="moreInfo">more</a>
        </div>
        <div class="vertical-bottom description" v-html="desc"></div>

        <a-drawer
            :title="title"
            placement="right"
            :closable="false"
            :visible="drawerVisible"
            @close="closeInfo"
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </a-drawer>
    </div>
</template>

<script lang="ts">
import $$ from "../library";
export default $$.Vue.extend({
    name: "BookmarkInformation",
    props: ["title", "url", "tag", "desc"], //组建接受的属性值
    data() {
        return {
            drawerVisible: false,
            avatarColor: $$.randomSoftRGBColor() as string,
        };
    },
    mounted() {
        // console.log($$.randomSoftRGBColor());
    },
    methods: {
        moreInfo() {
            this.drawerVisible = true;
        },
        closeInfo() {
            this.drawerVisible = false;
        }
    },
});
</script>

<style lang="scss" scoped>
.bookmark {
    font-size: 9px;

    .headline {
        .title {
            font-size: 200%;
        }
    }
    .description {
        font-size: 100%;
    }
}
</style>
