<template>
    <div>
        <el-header>
            <el-row class="table-nav" :gutter="50">
                <el-col :span="2">
                    <el-button type="primary">
                        <el-icon>
                            <Plus />
                        </el-icon>&nbsp;
                        新建
                    </el-button>
                </el-col>
                <el-col :span="2" :offset="1">
                    <el-button>批量通过</el-button>
                </el-col>
                <el-col :span="10" :offset="6">
                    <el-input v-model="input" placeholder="Please input" class="input-with-select">
                        <template #append>
                            <el-button :type="primary" size>
                                <el-icon>
                                    <Search />
                                </el-icon>搜索
                            </el-button>
                        </template>
                    </el-input>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-table ref="multipleTableRef" :data="tableData" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column label="Date" width="120">
                    <template #default="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column property="name" label="Name" width="120" />
                <el-table-column property="address" label="Address" show-overflow-tooltip />
            </el-table>
        </el-main>
        <el-footer>
            <el-pagination v-model:current-page="currentPage1" :page-size="100" :small="small" :disabled="disabled"
                :background="background" layout="total, prev, pager, next" :total="1000" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </el-footer>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>

</style>