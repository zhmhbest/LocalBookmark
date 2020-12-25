<template>
    <div class="row-container bookmark">
        <div
            class="headline col-container"
            ref="headline"
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
            <div class="description vertical-center" v-html="desc"></div>
            <!-- <div class="vertical-center">
                <a-tag v-for="item of tag" :key="item">{{ item }}</a-tag>
            </div> -->
            <a v-if="undefined !== more" slot="extra" href="#" @click="moreInfo">more</a>
        </div>

        <a-drawer
            v-if="undefined !== more"
            :title="title"
            placement="right"
            :closable="false"
            :visible="drawerVisible"
            @close="closeInfo"
        ><div v-html="more"></div></a-drawer>
    </div>
</template>

<script lang="ts">
import $$ from "../library";
export default $$.Vue.extend({
    name: "BookmarkInformation",
    props: ["title", "icon", "url", "tag", "desc", "more"], //组建接受的属性值
    data() {
        return {
            avatarSource: "#" as string,
            avatarStyle: { backgroundColor: $$.randomSoftRGBColor() },
            drawerVisible: false,
        };
    },
    mounted() {
        if (undefined === this.icon) {
            this.loadAvatar(5 * 1000);
        }
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
    margin-bottom: 20px;
    .headline {
        .title {
            margin-left: 5px;
            margin-right: 15px;
            font-size: 200%;
            font-style: bold;
            color: #AAA;
        }
    }
    .description {
        font-size: 100%;
        color: #666;
    }
}
</style>
