<template>
    <el-dialog
        class="v-el-dialog"
        :title="modalMsg.title||'提示'"
        :visible="modalMsg.visible||false"
        :width="modalMsg.width||'500px'"
        :close-on-press-escape="false"
        @close="close"
    >
        <slot name="content"></slot>

        <slot name="footer">
            <span slot="footer">
                <el-button
                    size="small"
                    type="primary"
                    :disabled="disabled"
                    @click="handleSubmit"
                >确 定</el-button>
                <el-button
                    size="small"
                    @click="close"
                >取 消</el-button>
            </span>
        </slot>
    </el-dialog>
</template>

<script>
    export default {
        name: 'modal',
        data() {
            return {}
        },
        mounted() {
            // console.log(this.$slots)
        },
        props: {
            modalMsg: {
                type: Object,
                default() {
                    return {}
                }
            },
            close: {
                type: Function,
                default() {}
            },
            handleSubmit: {
                type: Function,
                default() {}
            },
            disabled: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss">
    .v-el-dialog {

        .el-dialog__header {
            padding-top: 10px;

            .el-dialog__title {
                font-size: $fzsl;
            }

            .el-dialog__headerbtn {
                top: 11px;
            }
        }

        .el-dialog__footer {
            padding: 0px 20px 10px;
            text-align: center;
        }

        .el-dialog__body {
            padding: 10px 20px 20px;
        }
    }
</style>