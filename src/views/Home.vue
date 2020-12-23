<template>
    <div id="home">
        <!-- v-for="item of bookmarks" :key="item.url" -->
        <bminfo v-for="item of bookmarks" :key="item.url"
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
        };
    },
    mounted() {
        $$.axios.get("data/bookmark.json").then((res) => {
            this.bookmarks = res.data;
        });
    },
});
</script>

<style lang="scss" scoped>
#home {
}
</style>
