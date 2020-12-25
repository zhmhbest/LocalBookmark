<template>
    <div class="row-container bookmark">
        <div
            class="col-container headline"
            ref="headline"
            @click.self="onMainClick"
        >
            <a-avatar
                shape="square"
                :size="48"
                :src="avatarSource"
                :style="avatarStyle"
                @click="onMainClick"
                >{{ title }}</a-avatar
            >
            <div class="title vertical-center" @click="onMainClick">
                {{ title }}
            </div>
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
            avatarSource: "#" as string,
            avatarStyle: { backgroundColor: $$.randomSoftRGBColor() },
            drawerVisible: false,
        };
    },
    mounted() {
        this.loadAvatar(2 * 1000);
    },
    methods: {
        loadAvatar(timeout: number) {
            let isOK: boolean = false;
            const img: HTMLImageElement = (this.$refs
                .headline as HTMLDivElement).querySelector("img");
            img.onload = () => {
                // 加载图片
                isOK = true;
                this.avatarStyle.backgroundColor = "rgb(0, 0, 0, 0)";
            };
            img.src = `https://ico.kucat.cn/get.php?url=${this.url}`;
            setTimeout(() => {
                // 加载文字
                if (!isOK) {
                    img.src = "#";
                }
            }, timeout);
        },
        moreInfo() {
            this.drawerVisible = true;
        },
        closeInfo() {
            this.drawerVisible = false;
        },
        onMainClick() {
            window.open(this.url);
        },
    },
});
</script>

<style lang="scss" scoped>
.bookmark {
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
