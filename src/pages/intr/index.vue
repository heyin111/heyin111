<template>
    <div class="intr-page">
        <v-header :show-user="true"></v-header>
        <div class="page-content">
            <ul class="left-nav">
                <li class="nav-item"
                    v-for="(item, key) in IntrList"
                    :key="key"
                >
                    <a href="javascript:void(0);"
                       :class="['nav-txt', ACIndex === key ? 'active' : '']"
                       @click="cutACIndex(key)"
                    >{{item.name}}</a>
                </li>
            </ul>
            <div class="right-content">
                <div class="content-layout">
                    <div class="content-warp">
                        <ul class="mode-list">
                            <li v-for="(item, key) in IntrList"
                                :key="key"
                                :class="['mode-item', ACIndex === key ? 'active' : '', item.picture]"
                                @click="cutACIndex(key)"
                            >
                                <div class="item-content">
                                    <div class="item-part-top">
                                        <span :class="item.picture"></span>
                                        <span class="cc-line"></span>
                                        <p class="name-txt">{{item.name}}</p>
                                    </div>
                                    <div class="item-part-bottom">
                                        <span :class="item.picture"></span>
                                        <p class="name-txt">{{item.name}}</p>
                                        <p class="intr-txt">{{item.title}}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>

                        <div :class="['features-content', 'features-'+ACIndex]">
                            <v-feature :list="featureList"></v-feature>
                        </div>

                        <div :class="['scene-area', 'scene-'+ACIndex]">
                            <p class="txt">使用场景</p>
                            <v-scene :scenes="sceneList"></v-scene>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>

    import PageHeader from '@components/header/index.vue';
    import PageFooter from '@components/footer/index.vue';
    import FeatureList from './feature_list.vue';
    import Scene from './scene.vue';
    import {IntrList} from "@assets/static/index.js";

    export default {
        name: 'intrPage',
        data() {
            return {
                IntrList,
                ACIndex: 0,
                featureList: [],
                sceneList:[]
            }
        },
        mounted() {
            this.featureList = IntrList[0].features;
            this.sceneList = IntrList[0].scenes;
        },
        methods: {
            cutACIndex(index) {
                if (index === this.ACIndex)
                    return false;
                this.ACIndex = index;
                this.featureList = IntrList[index].features;
                this.sceneList = IntrList[index].scenes;
            }
        },
        components: {
            'v-header': PageHeader,
            'v-footer': PageFooter,
            'v-feature': FeatureList,
            'v-scene': Scene
        }
    }
</script>

<style lang="scss" scoped>
    @import "./scss/index.scss";
</style>