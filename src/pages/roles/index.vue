<template>
    <div class="roles">
        <v-top-filter
            :forms="forms"
            :form-data="formFilter"
            btn-type="roles"
            :handle-search="handleSearch"
            :reset-form="resetForm"
        />
        <div class="roles-list">
            <v-table
                :list="list"
                :head="head"
                :paging="pagination"
            />
        </div>
    </div>
</template>

<script>
    import VTable from '@components/table/index.vue';
    import TopFilter from '@components/top_filter/index.vue';
    import {RolesFilter} from '@assets/static/index.js';
    import {ROLES} from '@apis/index.js';
    import Tools from '@untils/index.js';

    export default {
        name: 'roles',
        data() {
            return {
                msg: 'roles',
                forms: RolesFilter,
                formFilter: {
                    name: '',
                    date: null
                },
                // table
                head: [
                    {
                        label: '序号'
                    }, {
                        prop: "name",
                        label: "角色名称",
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

        mounted() {
            this.requestRoles();
        },

        methods: {
            // 请求角色列表
            requestRoles() {
                let {currentPage, pageSize, formFilter} = this;
                let options = {
                    ...ROLES.list,
                    data: {
                        currentPage: currentPage,
                        pageSize: pageSize,
                        name: formFilter.name,
                        endTime: formFilter.date ? formFilter.date[1] : null,
                        startTime: formFilter.date ? formFilter.date[0] : null,
                    }
                };
                this._req.ajaxList(options, this);
            },

            handleSearch() {

            },

            resetForm() {

            }

        },
        components: {
            'v-top-filter': TopFilter,
            'v-table': VTable
        }
    }
</script>

<style lang="scss" scoped>
    @import "./scss/index.scss";
</style>