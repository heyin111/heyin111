<template>
    <div class="v-table">
        <el-table
            :data="list"
            style="width: 100%"
            @cell-click="cellClick"
            ref="VTable"
        >
            <template
                v-for="(column, cindex) in columns"
            >
                <el-table-column
                    v-if="column.operations"
                    :type="column.type||''"
                    :prop="column.prop"
                    :label="column.label"
                    :width="column.width"
                    :class-name="column.className||''"
                    :formatter="column.formatter"
                    :key="cindex"
                >
                    <template slot-scope="scope">
                        <div class="options-btn-parent"
                             v-for="(operate, index) in column.operations"
                             :key="index"
                        >
                            <el-button
                                circle
                                size="mini"
                                :icon="operate.icon"
                                :type="operate.type"
                                @click.stop="operate.func(scope.row, column)">{{operate.label}}
                            </el-button>

                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    v-else-if="column.tooltip"
                    :prop="column.prop"
                    :label="column.label"
                    :width="column.width"
                    :key="cindex"
                >
                    <template slot-scope="scope">
                        <el-tooltip :content="column.tipVal(scope.row.productId||0)">
                            <span>{{scope.row.userName}}</span>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                    v-else
                    :type="column.type||''"
                    :prop="column.prop"
                    :label="column.label"
                    :width="column.width"
                    :class-name="column.className||''"
                    :formatter="column.formatter"
                    :key="cindex"
                ></el-table-column>
            </template>
        </el-table>
        <div class="v-pagination">
            <el-pagination
                v-if="showPaging"
                :current-page="pagination.currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pagination.pageSize"
                :total="pagination.total"
                @current-change="currentChange"
                @size-change="sizeChange"
                layout="total, sizes, prev, pager, next, jumper"
                class="table-pagination">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'v-table',
        data() {
            return {}
        },

        computed: {
            columns() {
                this.head.forEach(item => {
                    if (item.label === '序号') {
                        item.type = 'index';
                        item.width = 80;
                    } else if (item.label === '操作') {
                        item.width = 200;
                    } else {
                        //
                    }
                });
                return this.head;
            },

            showPaging() {
              return !!Object.keys(this.paging).length
            },

            pagination() {
                return this.paging
            }
        },

        methods: {

        },

        mounted() {
            // console.log(this.pagination);
        },

        props: {
            list: {
                type: Array,
                default() {
                    return []
                }
            },
            head: {
                type: Array,
                default() {
                    return []
                }
            },
            paging: {
                type: Object,
                default() {
                    return {}
                }
            },
            cellClick: {
                type: Function,
                default: ()=>{ }
            },
            currentChange: {
                type: Function,
                default: () => { }
            },
            sizeChange: {
                type: Function,
                default: () => { }
            }
        }
    }
</script>

<style lang="scss">
    .v-table {
        width: 100%;
        margin-bottom: 30px;
        @include position(absolute, left, top);

        .v-pagination {
            text-align: right;
            margin-top: 15px;

            .el-pagination {
                &.table-pagination {
                    input, button, li {
                        background-color: transparent;
                    }
                }
            }
        }

        .el-table {

            color: #fff;
            background-color: transparent;

            thead {
                color: #D9D9D9;
            }

            .cell {
                text-align: center;
                line-height: 24px;

                .options-btn-parent {
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: 10px;
                    &:last-child {
                        margin-right: 0;
                    }
                    .el-button {
                        vertical-align: top;
                        padding: 4px;
                        i {
                            font-size: $fzn;
                        }
                    }
                }
            }

            .el-table__row .txt {
                color: #1890ff;
                cursor: pointer;
            }

            td, th {
                padding: 8px 0;
                border-bottom: 1px solid #252B3D;
                &.is-leaf {
                    border-bottom: 1px solid #252B3D;
                }
            }

            th, tr {
                background-color: transparent;
            }

            tr:hover > td {
                background-color: rgba(42, 54, 82, 0.66) !important;
            }
        }



        .el-table--border::after, .el-table--group::after, .el-table::before {
            background-color: transparent;
        }

        .el-table__expanded-cell {
            background-color: transparent;
        }
    }
</style>