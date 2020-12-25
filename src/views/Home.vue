<template>
    <div id="home">
        <!-- v-for="item of usebooks" :key="item.url" -->
        <bminfo v-for="item of usebooks" :key="item.url"
            :title="item.title"
            :url="item.url"
            :tag="item.tag"
            :desc="item.desc"
        ></bminfo>
    </div>
</template>

<script lang="ts">
import $$ from "../library";
import BookmarkInformation from "../components/BookmarkInformation.vue";

export default $$.Vue.extend({
    name: "home",
    components: {
        // 引入局部组建
        "bminfo": BookmarkInformation,
    },
    data() {
        return {
            bookmarks: [] as Object[],
            usebooks: [] as Object[]
        };
    },
    mounted() {
        $$.axios.get("data/bookmark.json").then((res) => {
            this.bookmarks = res.data;
            this.filterBookmark();
        });
        // 书签过滤
        $$.hash.pushOnHashChange(this.filterBookmark);
    },
    methods: {
        filterBookmark() {
            const arg =
                $$.hash.getHashArguements() as {include: string, exclude: string};
            console.log(arg);
            this.usebooks =
                $$.book.filterBookmark(
                    this.bookmarks as Array<{ 'tag': Array<string> }>,
                    arg.include, arg.exclude);
        }
    }
});
</script>

<style lang="scss" scoped>
#home {
}
</style>
