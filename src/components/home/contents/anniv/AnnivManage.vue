<template>
    <div>
        <el-header>
            <el-row class="table-nav" :gutter="50">
                <el-col :span="10" :offset="6">
                    <el-input v-model="searchWord" placeholder="输入关键词以查找" class="input-with-select">
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
            <el-table ref="postsTableRef" :data="tableData" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="35" />
                <el-table-column label="活动名称" width="350">
                    <template #default="scope">{{ scope.row.title }}</template>
                    </el-table-column>
                    <el-table-column property="authorID" label="管理员ID" width="100" />
                    <el-table-column property="authorID" label="开始时间" width="300" sortable/>
                    <el-table-column property="authorID" label="结束时间" width="300" sortable/>
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default>
                        <el-button link type="primary" size="small" @click="handleClick">详情</el-button>
                        <el-button link type="primary" size="small" @click="handleClick">删除</el-button>
                    </template>
    </el-table-column>
            </el-table>


<el-dialog v-model="dialogVisible" title="Warning" width="60%" center>
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">活动标题</h4>
      </div>
    </template>
    <el-form :inline="true" class="">
    <el-form-item label="新闻标题" style="width: 100%;">
      <el-input  placeholder="标题" style="width: 100%;"/>
    </el-form-item>
    </el-form>
    <el-row class="title">
        <el-col :span='2'>
            <p>起止时间</p>
        </el-col>
        <el-col :span="4">
            <el-date-picker v-model="startTime" type="datetime" placeholder="Select date and time" />
        </el-col>
        <el-col :span='1' :offset="1">
            <p>-</p>
        </el-col>
        <el-col :span="4">
            <el-date-picker v-model="endTime" type="datetime" placeholder="Select date and time" />
        </el-col>
    </el-row>
    <div class="editor">
        <v-md-editor v-model="text" height="400px" left-toolbar="undo redo bold italic h hr strikethrough ul ol quote table save clear" ></v-md-editor>
            </div>

    <template #footer>
        <span class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">
                保存
            </el-button>
        </span>
    </template>
</el-dialog>



        </el-main>
        <el-footer>
            <el-pagination v-model:current-page="currentPage1" :page-size="100" :small="small" :disabled="disabled"
                :background="background" layout="total, prev, pager, next" :total="1000" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </el-footer>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const searchWord = ref('')
const dialogVisible = ref(true)

</script>
<style lang="scss" scoped>
.el-row {
    margin-bottom: 20px;
}
.editor {
    border: 1px solid #f56c6c;
    width: 100%;
    border-radius: 5px;
}
</style>