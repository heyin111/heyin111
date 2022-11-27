<template>
    <div class="permission">
        <v-tree
            :data="permiList"
            :node-click="nodeClick"
            :showCheckbox="false"
            :render-content="renderContent"
            ref="permiTree"
        />
        <v-modal
            :modal-msg="editModal"
            :close="editModalClose"
            :disabled="editDisabled"
            :handle-submit="modalSubmit"
        >
            <div slot="content">
                <el-form
                    label-position="right"
                    label-width="100px"
                    size="small"
                    :rules="editRules"
                    :model="nodeData"
                    ref="editForm"
                    v-if="editModal.title !== '删除提示'"
                >
                    <el-form-item
                        prop="perName"
                        label="权限名称"
                    >
                        <el-input
                            v-model="nodeData.perName"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        prop="url"
                        label="权限URL"
                    >
                        <el-input
                            v-model="nodeData.url"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <p class="delete-txt" v-else>您确定删除该权限！</p>
            </div>
        </v-modal>
    </div>
</template>

<script>
    import Tree from '@components/tree/index.vue';
    import Modal from '@components/modal/index.vue';
    import {REG} from '@assets/static/index.js';
    import {PERMISSION} from '@apis/index.js';

    export default {
        name: 'permission',
        data() {
            return {
                permiList: [],
                editModal: {
                    title: '权限编辑',
                    visible: false
                },
                // 树节点数据
                nodeData: { },

                editRules: {
                    perName: [REG.required('blur')],
                    url: [REG.required('blur')]
                },
            }
        },

        mounted() {
            this.requestPermiList();
        },

        computed: {
            // 编辑弹框是否可以提交
            editDisabled() {
                let {perName='', url=''} = this.nodeData;
                return !perName||!url;
            }
        },

        methods: {
            // 请求权限
            requestPermiList() {
                this._req.ajax(PERMISSION.list).then(data => {
                    this.permiList = data;
                })
            },

            // 编辑弹框关闭
            editModalClose() {
                this.nodeData = {};
                this.editModal.title!=='删除提示'&&this.$refs['editForm'].resetFields();
                this.editModal.visible = false;
            },

            // 树节点点击
            nodeClick(data) {
                this.editModal.visible = true;
                this.nodeData = data;
            },

            append(event) {
                event.cancelBubble = true;
                this.editModal = {
                    title: '新增权限',
                    visible: true
                };
            },

            // submit
            modalSubmit() {
                let {title} = this.editModal;
                let type = title==='权限编辑'&&'edit'||'append';
                let {perName = '', url = '', perId = ''} = this.nodeData;
                let options = { ...PERMISSION.append, data: {perName, url, perId} };
                if (type === 'append') {
                    options.data.perId = new Date().getTime();
                } else if (type === 'edit') {
                    options = {...options, ...PERMISSION.edit}
                } else {
                    options = {...options, ...PERMISSION.delete};
                }

                this._req.ajax(options).then(() => {
                    this.editModal.visible = false;
                    this.requestPermiList();
                })
            },

            remove(event, data) {
                event.cancelBubble = true;
                this.nodeData = data;
                this.editModal = {
                    title: '删除提示',
                    visible: true
                };
            },

            renderContent(h, { node, data }) {
                return (
                    <span class="custom-tree-node">
                        <span class="tree-node-txt">{node.label}</span>
                        <span>
                            <el-button
                                size="mini"
                                type="text"
                                on-click={(event) => this.append(event)}
                            >添加</el-button>
                            <el-button
                                size="mini"
                                type="text"
                                on-click={ (event) => this.remove(event, data) }
                            >删除</el-button>
                        </span>
                    </span>
                );
            }
        },
        components: {
            'v-tree': Tree,
            'v-modal': Modal
        }
    }
</script>

<style lang="scss">
    @import "./scss/index.scss";
</style>