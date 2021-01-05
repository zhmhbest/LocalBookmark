<template>
  <div id="home">
    <tagfilter
        :include="arguements.include"
        :exclude="arguements.exclude"
        @filterChange="onFilterChange"
    />
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
import TagFilter from "../components/TagFilter.vue";
import { TagClickEvent } from "../components/BookmarkInformation.vue";
import { FilterChangeEvent } from "../components/TagFilter.vue";
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
    tagfilter: TagFilter
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
      this.bookmarks = [...this.bookmarks, ...res.data];
      // this.bookmarks = res.data;
      this.filterBookmark();
    });
    $$.getJsonpFile("http://127.0.0.1/bookmark/index.js", "bookCallback").then(dat => {
      let data = dat as Array<Bookmark>;
      for (let item of data) {
          item.tag = undefined === item.tag ? ['本地书签'] : [...item.tag, '本地书签'];
      }
      this.bookmarks = [...this.bookmarks, ...data];
      this.filterBookmark();
    });
    // 书签过滤
    $$.hash.pushOnHashChange(this.filterBookmark);
    // console.log("mounted");
  },
  methods: {
    filterBookmark() {
      this.arguements = $$.book.parseArguements(
        $$.hash.getHashArguements() as RawHashArguements
      );
    //   console.log(this.arguements);
      this.usebooks = $$.book.filterBookmark(this.bookmarks, this.arguements);
    },
    refreshArugements() {
        $$.hash.setHashArguements({
            include: Array.from(this.arguements.include),
            exclude: Array.from(this.arguements.exclude),
        });
    },
    onTagClick(tag: TagClickEvent) {
      // Ctrl   : include
      // Alt    : exclude
      // Default: only
      if (tag.ctrlKey) {
        this.arguements.include.add(tag.text);
        this.refreshArugements();
      } else if (tag.altKey) {
        this.arguements.exclude.add(tag.text);
        this.refreshArugements();
      } else {
        $$.hash.setHashArguements({
          include: tag.text,
        });
      }
    },
    onFilterChange(e: FilterChangeEvent) {
        if('closeInclude' === e.type) {
            this.arguements.include.delete(e.text);
            this.refreshArugements();
        } else if ('closeExclude' === e.type) {
            this.arguements.exclude.delete(e.text);
            this.refreshArugements();
        }
    }
  },
});
</script>

<style lang="scss" scoped>
#home {
}
</style>
