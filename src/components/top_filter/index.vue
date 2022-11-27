<template>
    <div class="filter-line">
        <div class="left-filter">
            <el-form
                class="top-filter"
                inline
                ref="topFilter"
                :model="formData"
            >
                <el-form-item
                    v-for="(item, index) in forms"
                    :key="index"
                    :label="item.label||''"
                >
                    <el-date-picker
                        size="small"
                        type="datetimerange"
                        v-model="formData[item.name]"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        v-if="item.type === 'date-picker'"
                    ></el-date-picker>
                    <el-input
                        size="small"
                        v-model="formData[item.name]"
                        :placeholder="item.placeholder||'请输入内容'"
                        v-else-if="item.type === 'search'"
                    >
                        <el-button
                            slot="append"
                            icon="el-icon-search"
                            @click="searchSubmit"
                        ></el-button>
                    </el-input>
                    <el-select
                        size="small"
                        width="100px"
                        v-model="formData[item.name]"
                        :placeholder="item.placeholder||'请选择'"
                        v-else-if="item.type === 'select'"
                    >
                        <el-option
                            :key="option.value"
                            :label="option.label"
                            :value="option.value"
                            v-for="option in item.options"
                        ></el-option>
                    </el-select>
                    <el-input
                        v-else
                        size="small"
                        v-model="formData[item.name]"
                        :placeholder="item.placeholder||'请输入内容'"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div
            v-if="!!btnType"
            class="right-btns"
        >
            <el-button
                size="small"
                type="primary"
                icon="el-icon-plus"
                @click="handleBtn"
            >{{btnType==='user'&&'新增用户'||'新增角色'}}</el-button>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: 'topFilter',
        data() {
            return {}
        },

        methods: {
            searchSubmit() {
                let formInfo = Object.assign({}, this.formData);
                let hasDate = Object.keys(formInfo).includes('date');
                hasDate&&formInfo.date ? formInfo.date = formInfo.date.map(item => moment(item).valueOf()) : 0;
                this.handleSearch(formInfo);
            }
        },

        props: {
            // el-form-item
            forms: {
                type: Array,
                default() {
                    return []
                }
            },
            // 筛选数据 需要的
            formData: {
                type: Object,
                default() {
                    return {}
                }
            },
            // 搜索按钮
            handleSearch: {
                type: Function,
                default: () => {}
            },
            // 右边按钮类型  user role
            btnType: {
                type: String,
                default: 'user'
            },
            // 右边按钮点击
            handleBtn: {
                type: Function,
                default() {}
            },
            // reset-form
            resetForm: {
                type: Function,
                default() {}
            }
        }

    }
</script>

<style lang="scss">

    .filter-line {
        width: 100%;
        padding: 20px 0px;
        @include flex_layout(row, flex-start, center);

        .left-filter {

            .top-filter {
                .el-form-item {
                    margin-bottom: 0;

                    .el-form-item__content {
                        line-height: normal;
                    }

                    .el-form-item__label {
                        line-height: 32px;
                        color: #fff;
                    }
                }
            }
        }

        .right-btns {
            flex:1;
            @include flex_layout(row, flex-end, center);
            
            .el-button {
                font-size: $fzn;
                height: 32px;
            }
        }
    }
</style>