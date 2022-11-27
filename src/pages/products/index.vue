<template>
    <div class="products-template">
        <v-crumbs :crumbs="crumbs" />
        <ul class="product-list">
            <li
                class="product-item"
                v-for="(item, index) in productList"
                :key="index"
            >
                <img
                    :src="item.product_image||require('@assets/icons/product_default.png')"
                    alt="product-img"
                    class="product-img"
                />
                <p class="product-name">{{item.product_name||'---'}}</p>
                <div class="user-num">
                    <div class="item-num">
                        <p class="name">总人数</p>
                        <p class="num">{{item.total_num||'---'}}</p>
                    </div>
                    <div class="item-num">
                        <p class="name">在线</p>
                        <p class="num">{{item.online_num||'---'}}</p>
                    </div>
                </div>
                <div
                    class="detail-btn"
                    @click="productDetail(item.id)"
                >查看详情</div>
            </li>
            <li class="not-use" v-for="i in noUseList" :key="i"></li>
        </ul>
    </div>
</template>

<script>
    import Crumbs from '@components/crumbs/index.vue';
    import Tools from '@untils/index.js';
    import {PRODUCT} from '@apis/index.js';

    export default {
        name: 'product',
        data() {
            return {
                noUseList: Tools.createArray(20),
                crumbs:[{ title: '产品列表'}],
                productList: []
            }
        },

        mounted() {
            this.requsetProducts();
        },

        methods: {
            requsetProducts() {
                this._req.ajax(PRODUCT.list).then(data => {
                    this.productList = data
                })
            },

            productDetail(id) {
                Tools.routerPath.call(this, `/manage/product_users/${id}`)
            }
        },

        components: {
            'v-crumbs': Crumbs
        }
    }
</script>

<style lang="scss" scoped>
    @import './scss/index.scss';
</style>