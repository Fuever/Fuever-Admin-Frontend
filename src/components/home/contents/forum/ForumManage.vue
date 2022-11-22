<template>
    <div>
        <el-header>
            <el-row class="table-nav" :gutter="50">
                <el-col :span="1" :offset="0">
                    <el-button type="primary">批量通过</el-button>
                </el-col>
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
                <el-table-column label="标题" width="320">
                    <template #default="scope">{{ scope.row.title }}</template>
                    </el-table-column>
                    <el-table-column property="authorID" label="用户ID" width="100" />
                    <el-table-column prop="state" label="状态" width="100" :filters="[
                            { text: '置顶', value: '1' },
                            { text: '已通过', value: '2' },
                            { text: '未通过', value: '3' },
                            { text: '已删除', value: '4' }
                          ]" :filter-method="filterTag" filter-placement="bottom-end">
                        <template #default="scope">
                            <el-tag :type="scope.row.state === 'Home' ? '' : 'success'">{{ state.row.tag }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column property="startTimel" label="创建时间" width="300" sortable/>
                <el-table-column property="name" label="更新时间" width="300" sortable/>
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default>
                        <el-button link type="primary" size="small" @click="handleClick">详情</el-button>
                        <el-button link type="primary" size="small" @click="handleClick">置顶</el-button>
                        <el-button link type="primary" size="small" @click="handleClick">通过</el-button>
                        <el-button link type="primary" size="small" @click="handleClick">删除</el-button>
                    </template>
    </el-table-column>
            </el-table>


<el-dialog v-model="dialogVisible" title="Warning" width="60%" center>
    <template #header="{ titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">This is a custom header!</h4>
      </div>
    </template>

    <el-form :inline="true" class="">
    <el-form-item label="作者">
      <el-input  placeholder="作者ID" disabled/>
    </el-form-item>
    <el-form-item label="锁定">
      <el-select >
        <el-option label="已锁定" value="1" />
        <el-option label="未锁定" value="0" />
      </el-select>
    </el-form-item>
    <el-form-item label="状态">
      <el-select >
        <el-option label="置顶" value="1" />
        <el-option label="已通过" value="2" />
        <el-option label="未通过" value="3" />
        <el-option label="已删除" value="4" />
      </el-select>
    </el-form-item>
  </el-form>
     <el-form-item label="创建时间">
      <el-col :span="8">
        <el-date-picker
          type="datetime"
          placeholder="Pick a time"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="2" class="text-center" :offset="1">
        <span class="text-gray-500">更新时间</span>
      </el-col>
      <el-col :span="8">
        <el-date-picker
            type="datetime"
          placeholder="Pick a time"
          style="width: 100%"
        />
      </el-col>
    </el-form-item>
    <el-table :data="tableData" style="width: 100%" max-height="250">
    <el-table-column type="selection" width="35" />
    <el-table-column prop="date" label="评论" width="300" />
    <el-table-column prop="city" label="用户ID" width="120" />
    <el-table-column prop="address" label="创建时间" width="300" sortable/>
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button
          link
          plain
          type="primary"
          size="small"
          @click.prevent="deleteRow(scope.$index)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
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

</style>