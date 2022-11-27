<template>
    <div class="home-page">
        <v-header :show-user="true"></v-header>
        <div class="home-content">
            <div class="top-content">
                <ul class="part-content"
                    :style="{ left: -(ACIndex*100)+'%' }"
                >
                    <li class="item-part"
                        v-for="(item, index) in FnList"
                        :key="index"
                    >
                        <div class="left-fn-title">
                            <p class="fn-title">{{item.title}}</p>
                            <span class="intr-txt">{{item.intr}}--{{footerStatus.changableNum}}</span>
                        </div>
                        <div class="right-img-parent">
                            <img :src="item.image" alt="ai" class="fn-img"/>
                        </div>
                    </li>
                </ul>
            </div>
            <ul class="bottom-content">
                <li
                    v-for="(item, index) in FnList"
                    :key="index"
                    :class="['bottom-item', index === ACIndex ? 'active' : '']"
                    @mouseenter="mouseenter(index)"
                    @click="changeRouter(index)"
                >
                    <div class="b-cc">
                        <span :class="item.icon"></span>
                        <p class="small-title">{{item.title}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>

    import Tools from '@untils/index.js';
    import {FnList} from '@assets/static/index.js';
    import PageHeader from '@components/header/index.vue';
    import PageFooter from '@components/footer/index.vue';
    import {mapState, /*mapGetters,*/ mapActions} from 'vuex';

    export default {
        name: 'home',
        data() {
            return {
                FnList,
                ACIndex: 0,
                routerPath: Tools.routerPath.bind(this)
            }
        },
        computed: {
            ...mapState({
                footerStatus: state => state.footerStatus,
                collectionStatus: state => state.collectionStatus
            }),
            // ...mapGetters('collectionStatus', {
            //     arrlist: 'renderCollects' // renderCollects 是collectionStatus--modules中getters内的方法
            // })
        },

        watch: {
            
        },
        
        mounted() {
            // console.log(this);
        },
        
        methods: {

            ...mapActions('footerStatus', [
                'getNewNum'
            ]),

            ...mapActions('collectionStatus', [
                'invokePushItems'
            ]),

            mouseenter(index) {
                this.ACIndex = index;
                this.getNewNum(index).then(() => {
                    
                });
                this.invokePushItems(index);
            },

            changeRouter(index) {
                let path = index===0&&'/intr'||index===1&&'/manage/products'||index===2&&'/intr'||'/home';
                this.routerPath(path);
            }
        },
        components: {
            'v-header': PageHeader,
            'v-footer': PageFooter,
        }
    }
</script>

<style lang="scss" scoped>
    @import "./scss/index.scss";
</style>