<template>
    <div class="product-users">
        <v-crumbs :crumbs="crumbs"/>
        <v-top-filter
            :forms="forms"
            :form-data="formFilter"
            :handle-search="handleSearch"
            :handle-btn="appendNewUser"
            :reset-form="resetFilterForm"
        />
        <div class="user-list">
            <v-table
                :list="list"
                :head="head"
                :cell-click="cellClick"
                :paging="pagination"
                :current-change="currentChange"
                :size-change="sizeChange"
            />
        </div>
        <v-modal
            :modal-msg="modalMsg"
            :close="closeModal"
        >
            <div slot="content">
                <el-form
                    label-position="right"
                    label-width="100px"
                    size="small"
                    ref="userMsgForm"
                    :rules="rules"
                    :model="userMsg"
                    :disabled="modalMsg.title === '用户详情'"
                >
                    <el-form-item
                        prop="username"
                        label="用户名"
                    >
                        <el-input
                            v-model="userMsg.username"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        prop="name"
                        label="用户姓名"
                    >
                        <el-input
                            v-model="userMsg.name"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        prop="email"
                        label="邮箱"
                    >
                        <el-input
                            v-model="userMsg.email"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        prop="phone"
                        label="手机号"
                    >
                        <el-input
                            v-model="userMsg.phone"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="选择角色">
                        <el-input v-model="userMsg.role"></el-input>
                    </el-form-item>
                    <el-form-item label="机构信息">
                        <el-input v-model="userMsg.org"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="modal-footer">
                <span v-if="modalMsg.title !== '用户详情'">
                    <el-button
                        size="small"
                        type="primary"
                        :disabled="formValidated"
                        @click="submitForm"
                    >提 交</el-button>
                    <el-button
                        size="small"
                        @click="closeModal"
                    >取 消</el-button>
                </span>
            </div>
        </v-modal>
    </div>
</template>

<script>
    import VTable from '@components/table/index.vue';
    import Crumbs from '@components/crumbs/index.vue';
    import TopFilter from '@components/top_filter/index.vue';
    import Modal from '@components/modal/index.vue';

    import {PRODUCTUSERS} from '@apis/index.js';
    import {ProductFilter, REG} from '@assets/static/index.js';

    import Tools from '@untils/index.js';

    export default {
        name: 'productUsers',
        data() {
            return {
                id: this.$route.params.id || '',
                // 表格项的内容
                head: [
                    {
                        label: '序号'
                    }, {
                        prop: "createTime",
                        label: "创建时间",
                        formatter(row) {
                            return Tools.formatTime(row.createTime)
                        }
                    }, {
                        prop: "name",
                        label: "姓名",
                        className: 'txt'
                    }, {
                        prop: "lastLogin",
                        label: "最后登录时间",
                        formatter(row) {
                            return Tools.formatTime(row.lastLogin)
                        }
                    }, {
                        prop: "updataTime",
                        label: "更新时间",
                        formatter(row) {
                            return Tools.formatTime(row.updataTime)
                        }
                    }, {
                        label: "操作",
                        operations: [{
                            method: 'icon',
                            type: 'primary',
                            icon: 'el-ali-icon-Reset-Settings',
                            func: this.resetPwd
                        }, {
                            method: 'icon',
                            type: 'primary',
                            icon: 'el-ali-icon-edit',
                            func: this.editUser
                        }, {
                            method: 'icon',
                            type: 'danger',
                            icon: 'el-ali-icon-delete1',
                            func: this.deleteUser
                        }]
                    }
                ],
                // 面包屑
                crumbs: [
                    {
                        path: '/manage/products',
                        title: '产品列表'
                    }, {
                        title: '123456'
                    }
                ],
                // 顶部筛选
                forms: ProductFilter,
                // 弹框
                modalMsg: {
                    title: '新增用户',
                    visible: false,
                },
                // 用户弹框信息
                userMsg: {
                    username:'',
                    name:'',
                    email:'',
                    phone:'',
                    role:'',
                    org: ''
                },
                rules: {
                    username: [REG.required()],
                    name: [REG.required()],
                    email: [REG.required(), {pattern: REG.email, message: '请输入正确的邮箱地址', trigger: ['change']}],
                    phone: [REG.required(), {pattern: REG.phone, message: '请输入正确的手机号', trigger: 'change'}]
                },
                // 筛选的值
                formFilter: {
                    name: '',
                    date: null
                },
                // 分页
                currentPage: 1,
                pageSize: 10,
                pagination: {},
                list: [],
            }
        },
        mounted() {
            this.requestUsers();
        },
        computed: {
            formValidated() {
                let {username, name, email, phone} = this.userMsg;
                return !username||!name||!email||!phone||!REG.phone.test(phone)||!REG.email.test(email);
            }
        },
        methods: {
            // 请求产品用户列表
            requestUsers() {
                let {currentPage, pageSize, formFilter, id} = this;
                let options = {
                    ...PRODUCTUSERS.list(id),
                    data: {
                        currentPage: currentPage,
                        pageSize: pageSize,
                        name: formFilter.name,
                        endTime: formFilter.date ? formFilter.date[1] : null,
                        startTime: formFilter.date ? formFilter.date[0] : null
                    }
                };
                this._req.ajaxList(options, this);
            },
            // 关闭弹框
            closeModal() {
                this.userMsg = {
                    username:'',
                    name:'',
                    email:'',
                    phone:'',
                    role:'',
                    org: ''
                };
                this.$refs['userMsgForm'].resetFields();
                this.modalMsg = {
                    title: '新增用户',
                    visible: false,
                };
            },

            // 新怎用户
            appendNewUser() {
                this.modalMsg = {
                    title: '新增用户',
                    visible: true,
                };
            },

            // 提交
            submitForm() {
                let options = {
                    ...PRODUCTUSERS.appendUser,
                    data: this.userMsg
                };
                this._req.ajax(options).then(() => {
                    this.currentPage = 1;
                    this.closeModal();
                    this.requestUsers();
                })
            },

            // 重置筛选条件
            resetFilterForm() {
                this.formFilter = {
                    name: '',
                    date: null
                };
            },
            // 获取用户详情
            requestUserDetail(row, title) {
                let options = PRODUCTUSERS.productUser(row.id);
                this._req.ajax(options).then(data => {
                    this.userMsg = data;
                    this.modalMsg = {
                        title,
                        visible: true
                    }
                });
            },
            // 搜索按钮
            handleSearch(formInfo) {
                this.currentPage = 1;
                this.pageSize = 10;
                this.formFilter = formInfo;
                this.requestUsers();
            },
            // 改变当前页
            currentChange(current) {
                this.currentPage = current;
                this.requestUsers()
            },
            // 改变page-size
            sizeChange(size) {
                this.pageSize = size;
                this.requestUsers()
            },
            // 重置密码 args => row
            resetPwd() {
            },
            // 编辑用户 args => row
            editUser(row) {
                this.requestUserDetail(row, '编辑用户')
            },
            // 删除用户 args => row
            deleteUser() {
            },
            // cell-click args => row
            cellClick(row, column) {
                if (column.label !== '姓名')
                    return false;
                this.requestUserDetail(row, '用户详情')
            }
        },
        // 组件
        components: {
            'v-table': VTable,
            'v-crumbs': Crumbs,
            'v-top-filter': TopFilter,
            'v-modal': Modal
        }
    }
</script>

<style lang="scss" scoped>
    @import "./scss/index.scss";
</style>