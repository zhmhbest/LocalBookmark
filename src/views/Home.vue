<template>
  <div id="home">
    <!-- v-for="item of usebooks" :key="item.url" -->
    <bminfo
      v-for="item of usebooks"
      :key="item.url"
      :title="item.title"
      :icon="item.icon"
      :url="item.url"
      :tag="item.tag"
      :desc="item.desc"
      :more="item.more"
      @onTagClick="onTagClick"
    ></bminfo>
  </div>
</template>

<script lang="ts">
import $$ from "../library";
import BookmarkInformation from "../components/BookmarkInformation.vue";
import { TagClickEvent } from "../components/BookmarkInformation.vue";
import {
  Bookmark,
  RawHashArguements,
  HashArguements,
} from "../library/bookmark";

export default $$.Vue.extend({
  name: "home",
  components: {
    // 引入局部组建
    bminfo: BookmarkInformation,
  },
  data() {
    return {
      arguements: {} as HashArguements,
      bookmarks: [] as Array<Bookmark>,
      usebooks: [] as Array<Bookmark>,
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
      this.arguements = $$.book.parseArguements(
        $$.hash.getHashArguements() as RawHashArguements
      );
      console.log(this.arguements);
      this.usebooks = $$.book.filterBookmark(this.bookmarks, this.arguements);
    },
    onTagClick(tag: TagClickEvent) {
      // Ctrl   : include
      // Alt    : exclude
      // Default: only
      if (tag.ctrlKey) {
        this.arguements.include.add(tag.text);
        $$.hash.setHashArguements({
            include: Array.from(this.arguements.include),
            exclude: Array.from(this.arguements.exclude),
        });
      } else if (tag.altKey) {
        this.arguements.exclude.add(tag.text);
        $$.hash.setHashArguements({
            include: Array.from(this.arguements.include),
            exclude: Array.from(this.arguements.exclude),
        });
      } else {
        $$.hash.setHashArguements({
          include: tag.text,
        });
      }
    },
  },
});
</script>

<style lang="scss" scoped>
#home {
}
</style>
