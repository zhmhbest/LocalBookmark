/*
 * Vue VueRouter Vuex
 */
import Vue from 'vue'
if (undefined === Vue)
    // @ts-ignore
    Vue = require('vue'); // CDN修正

import VueRouter from 'vue-router'
if (undefined === VueRouter)
    // @ts-ignore
    VueRouter = require('vue-router'); // CDN修正

import Vuex from 'vuex'
if (undefined === Vuex)
    // @ts-ignore
    Vuex = require('vuex'); // CDN修正

export {
    Vue,
    VueRouter,
    Vuex
};


/*
 * Echarts
 */
import * as echarts from 'echarts'
if (undefined === echarts)
    // @ts-ignore
    echarts = require('echarts'); // CDN修正


/*
 * Ant-Design
 */
import Antd from 'ant-design-vue';
if (undefined === Antd) {
    // @ts-ignore
    Antd = require('ant-design-vue'); // CDN修正
    // CSS已自动引入
} else {
    // 若未引入CDN应解除以下注释
    // require('ant-design-vue/dist/antd.css');
}
Vue.use(Antd);


/*
 * Axios
 */
import axios from 'axios'
if (undefined === axios)
    // @ts-ignore
    axios = require('axios'); // CDN修正


// export $$
export default {
    Vue,
    echarts,
    Antd,
    axios,
}