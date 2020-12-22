<template>
    <div id="home">
        <a-card 
            v-for="item of bookmarks"
            :key="item"
            size="small"
            :title="item.title"
        >
            <a slot="extra" href="#">more</a>
            <p>card content</p>
        </a-card>
        <li v-for="item of bookmarks" :key="item">
            {{item.title}}
        </li>
    </div>
</template>

<script lang="ts">
import $$ from "../library";
export default $$.Vue.extend({
    name: "home",
    data() {
        return {
            bookmarks: [] as Object[]
        };
    },
    mounted() {
        $$.axios.get("data/bookmark.json").then(res => {
            this.bookmarks = res.data;
        });
    },
});
</script>

<style lang="scss" scoped>
#home {

}
</style>
