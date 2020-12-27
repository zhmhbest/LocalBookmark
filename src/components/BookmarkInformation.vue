<template>
    <div class="col-container bookmark">
        <div
            class="headline col-container"
            ref="headline"
        >
            <a-avatar
                shape="square"
                :size="32"
                :src="avatarSource"
                :style="avatarStyle"
                @click="onMainClick"
                >{{ title }}</a-avatar
            >
            <div class="title vertical-center" @click="onMainClick">
                {{ title }}
            </div>
            <div class="description vertical-center" v-html="desc instanceof Array ? desc.join('&nbsp;') : desc"></div>
            <a v-if="undefined !== more" slot="extra" href="javascript:;" @click="moreInfo">more</a>
        </div>

        <!-- tag -->
        <div class="tag vertical-center">
            <a-tag v-for="item of tag" :key="item" :style="{color: 'white', backgroundColor: tagColorHolder.get(item)}" @click="onTagClick($event, item)">{{ item }}</a-tag>
        </div>

        <!-- more -->
        <a-drawer
            v-if="undefined !== more"
            :width="'60%'"
            :title="title"
            placement="right"
            :closable="false"
            :visible="drawerVisible"
            @close="closeInfo"
        ><div v-html="more instanceof Array ? more.join('<br>') : more"></div></a-drawer>

    </div>
</template>

<script lang="ts">
export interface TagClickEvent {
  altKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  text: string;
}
import $$ from "../library";
export default $$.Vue.extend({
    name: "BookmarkInformation",
    props: ["title", "icon", "url", "tag", "desc", "more"], //组建接受的属性值
    data() {
        return {
            tagColorHolder: $$.book.tagColorHolder,
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
            this.avatarSource = `https://ico.kucat.cn/get.php?url=${this.url}`;
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
        onTagClick(e: MouseEvent, item: string) {
            // console.log(e.altKey, e.ctrlKey, e.shiftKey, item);
            this.$emit('onTagClick', {
                altKey: e.altKey,
                ctrlKey: e.ctrlKey,
                shiftKey: e.shiftKey,
                text: item
            } as TagClickEvent);
        }
    },
});
</script>

<style lang="scss" scoped>
.bookmark {
    margin-bottom: 20px;
    justify-content: space-between;
    .headline {
        .title {
            margin-left: 5px;
            margin-right: 8px;
            font-size: 200%;
            font-style: bold;
            color: #AAA;
        }
        .description {
            font-size: 100%;
            color: #666;
        }
    }
    // .tag {
    //     color: aliceblue;
    // }
}
</style>
