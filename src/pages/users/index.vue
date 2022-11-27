<template>
    <div class="user-list">
        <v-crumbs :crumbs="crumbs"/>
        <v-top-filter
            :forms="forms"
            :form-data="formFilter"
            :handle-search="handleSearch"
            :reset-form="resetForm"
        />
        <div class="total-user-list">
            <v-table
                :list="list"
                :head="head"
                :paging="pagination"
                :current-change="currentChange"
                :size-change="sizeChange"
            />
        </div>
    </div>
</template>

<script>
    import VTable from '@components/table/index.vue';
    import Crumbs from '@components/crumbs/index.vue';
    import TopFilter from '@components/top_filter/index.vue';
    // import Modal from '@components/modal/index.vue';

    import {ALLUSERS} from '@apis/index.js';
    import {UserListFilter, Products, REG} from '@assets/static/index.js';

    import Tools from '@untils/index.js';

    export default {
        name: 'user-list',
        data() {
            return {
                forms: UserListFilter,
                crumbs: [{
                    title: '用户列表'
                }],
                formFilter: {
                    product_id: '',
                    name: '',
                    date: null
                },

                // table
                // 表格项的内容
                head: [{
                    label: '序号'
                }, {
                    prop: "userName",
                    label: "用户名",
                    tooltip: true,
                    tipVal: id => Products[id]
                }, {
                    prop: "name",
                    label: "姓名",
                    className: 'txt',
                }, {
                    prop: "createTime",
                    label: "创建时间",
                    formatter: row => Tools.formatTime(row.createTime)
                }, {
                    prop: "lastLogin",
                    label: "最后登录时间",
                    formatter: row => Tools.formatTime(row.lastLogin)
                }, {
                    prop: "updataTime",
                    label: "更新时间",
                    formatter: row => Tools.formatTime(row.updataTime)
                }, {
                    label: "操作",
                    operations: [{
                        method: 'icon',
                        type: 'primary',
                        icon: 'el-ali-icon-Reset-Settings',
                        // func: this.resetPwd
                    }, {
                        method: 'icon',
                        type: 'primary',
                        icon: 'el-ali-icon-edit',
                        // func: this.editUser
                    }, {
                        method: 'icon',
                        type: 'danger',
                        icon: 'el-ali-icon-delete1',
                        // func: this.deleteUser
                    }]
                }
                ],
                // 分页
                currentPage: 1,
                pageSize: 10,
                pagination: {},
                list: [],
            }
        },

        methods: {
            handleSearch(formInfo) {
                this.currentPage = 1;
                this.pageSize = 10;
                this.formFilter = formInfo;
                this.requestUsers();
            },
            // 请求用户列表
            requestUsers() {
                let {currentPage, pageSize, formFilter} = this;
                let options = {
                    ...ALLUSERS.userList,
                    data: {
                        currentPage: currentPage,
                        pageSize: pageSize,
                        name: formFilter.name,
                        endTime: formFilter.date ? formFilter.date[1] : null,
                        startTime: formFilter.date ? formFilter.date[0] : null,
                        productId: formFilter.product_id || ''
                    }
                };
                this._req.ajaxList(options, this);
            },
            resetForm() {
                this.formFilter = {
                    product_id: '',
                    name: '',
                    date: null
                }
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
        },

        mounted() {
            this.requestUsers()
        },

        components: {
            'v-table': VTable,
            'v-crumbs': Crumbs,
            'v-top-filter': TopFilter
        }
    }
</script>

<style lang="scss" scoped>
    @import './scss/index.scss';
</style>