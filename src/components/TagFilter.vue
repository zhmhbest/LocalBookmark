<template>
    <div class="tagfilter">
        <div class="filter"><span class="label">包括：</span>
            <a-tag 
            v-for="item of undefined === include ? [] : Array.from(include)"
            :key="item"
            :style="{color: 'white', backgroundColor: tagColorHolder.get(item)}"
            closable @close="closeTagInclude(item)"
            >{{item}}</a-tag>
        </div>
        <div class="filter"><span class="label">排除：</span>
            <a-tag 
            v-for="item of undefined === exclude ? [] : Array.from(exclude)"
            :key="item"
            :style="{color: 'white', backgroundColor: tagColorHolder.get(item)}"
            closable @close="closeTagExclude(item)"
            >{{item}}</a-tag>
        </div>
    </div>
</template>

<script lang="ts">
import $$ from "../library";
export interface FilterChangeEvent {
    type: string;
    text: string;
}
export default $$.Vue.extend({
    name: "TagFilter",
    props: ["include", "exclude"], //组建接受的属性值
    data() {
        return {
            tagColorHolder: $$.book.tagColorHolder,
        };
    },
    mounted() {
    },
    methods: {
        closeTagInclude(item: string) {
            // console.log(item);
            this.$emit('filterChange', {type: 'closeInclude', text: item} as FilterChangeEvent);
        },
        closeTagExclude(item: string) {
            // console.log(item);
            this.$emit('filterChange', {type: 'closeExclude', text: item} as FilterChangeEvent);
        }
    }
});
</script>

<style lang="scss" scoped>
.tagfilter{
    margin-bottom: 20px;
    .filter {
        margin-bottom: 10px;
        .label{
            color: antiquewhite;
            font-size: 180%;
        }
    }
}
</style>
