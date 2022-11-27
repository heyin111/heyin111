<template>
    <ul class="feature-list">
        <li class="feature-item"
            v-for="(item, key) in list"
            :key="key"
        >
            <p class="feature-title">{{item.title}}</p>
            <p class="feature-intr">{{item.intr}}</p>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'featureList',
        data() {
            return {}
        },
        props: {
            list: {
                type: Array,
                default(){
                    return []
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .feature-list {
        padding: 20px;

        .feature-item {
            padding-top: 10px;
            overflow: hidden;
            border-bottom: 1px solid $bc3;
            &:last-child {
                border-bottom: none;
            }

            .feature-title {
                color: $cor0;
                font-size: $fzsl;
                line-height: 24px;
                margin-bottom: 5px;
            }

            .feature-intr {
                color: $cor7;
                font-size: $fzn;
                line-height: 22px;
                margin-bottom: 10px;
            }
        }
    }
</style>