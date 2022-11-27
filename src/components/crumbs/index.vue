<template>
    <div class="crumbs">
        <span class="line"></span>
        <span
            v-for="(item, index) in crumbs"
            :key="index"
            @click="routerPath(item.path||null)"
            class="crumbs-item"
        >
            <em v-if="index">/</em>
            {{item.title}}
        </span>
    </div>
</template>

<script>
    import Tools from '@untils/index.js';

    export default {
        name: 'crumbs',
        data() {
            return {}
        },
        methods: {
            routerPath(path) {
                if (!path)
                    return false;
                Tools.routerPath.call(this, path);
            }
        },
        props: {
            crumbs: {
                type: Array,
                default() {
                    return []
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .crumbs {
        width: 100%;
        padding: 0px 15px 10px;
        border-bottom: 1px solid #293555;

        .line {
            display: inline-block;
            vertical-align: top;
            width: 3px;
            height: 24px;
            background-color: $bg7;
            margin-right: 10px;
        }

        .crumbs-item {
            display: inline-block;
            line-height: 24px;
            font-size: $fzsl;
            color: $cor0;
            cursor: pointer;

            &:last-child {
                cursor: default;
            }

            em {
                font-size: 14px;
                padding: 0 2px;
            }
        }
    }
</style>