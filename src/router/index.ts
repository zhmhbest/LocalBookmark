// import Vue from 'vue'
// import VueRouter from 'vue-router'
import { Vue, VueRouter } from '../library'
import { RouteConfig } from 'vue-router'
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [];
function addView(name: string, url?: string) {
    routes.push({
        path: undefined === url ? `/${name.toLowerCase()}` : `${url}`,
        name: name,
        component: () => import(`../views/${name}.vue`)
    });
}

import RouterTable from './table.json5'
for(let item of RouterTable) {
    if (item instanceof Object) {
        addView(item['view'], item['path']);
    } else if ('string' === typeof item) {
        addView(item);
    }
}

export default new VueRouter({
    routes
});