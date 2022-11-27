<template>
    <div class="custom-tree-container">
        <el-tree
            node-key="perId"
            :data="data"
            :show-checkbox="showCheckbox"
            :default-expanded-keys="defaultExpandedKeys"
            :expand-on-click-node="false"
            :render-content="renderContent"
            @node-click="nodeClick"
            ref="elTree"
        >
        </el-tree>
    </div>
</template>

<script>
    export default {
        name: 'tree',
        data() {
            return {

            }
        },
        methods: {
            
        },

        computed: {
            defaultExpandedKeys() {
                let firstKey = this.data.length ? this.data[0].perId : '';
                return [firstKey]
            }
        },

        props: {
            renderContent: {
                type: Function,
                default: () => {}
            },
            data: {
                type: Array,
                default: () => []
            },
            showCheckbox: {
                type: Boolean,
                default: false
            },
            nodeClick: {
                type: Function,
                default: () => {}
            }
        }
    }
</script>

<style lang="scss">
    .custom-tree-container {
        max-height: 100%;
        overflow-y: auto;
        padding: 10px 0;
        overflow-y: auto;
        .el-tree {
            width: 400px;
            background-color: transparent;
            color: #fff;

            .el-tree-node {

                &:focus>.el-tree-node__content,
                .el-tree-node__content:hover {
                    background-color: transparent;
                }
            }

            .custom-tree-node {
                flex: 1;
                font-size: $fzn;
                padding-right: 8px;
                @include flex_layout(row, space-between, center);

                .tree-node-txt {
                    font-size: $fzsl;
                }
            }
        }
    }
</style>