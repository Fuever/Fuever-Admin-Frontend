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
                <el-table-column label="用户名" width="250">
                    <template #default="scope">{{ scope.row.title }}</template>
                    </el-table-column>
                    <el-table-column property="authorID" label="用户ID" width="100" />
                    <el-table-column property="authorID" label="用户邮箱" width="300" />
                    <el-table-column property="authorID" label="用户IP" width="200" />
                    <el-table-column property="authorID" label="创建时间" width="300" sortable/>
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
        <h4 :id="titleId" :class="titleClass">用户ID:</h4>
      </div>
    </template>

    <el-form :inline="true" class="">
    <el-form-item label="用户昵称">
      <el-input  placeholder="作者ID" disabled style="width: 100px;"/>
    </el-form-item>
    <el-form-item>
        <el-form-item label="电话">
      <el-input  placeholder="911" style="width: 150px;"/>
    </el-form-item>
    </el-form-item>
    <el-form-item>
        <el-form-item label="位置">
      <el-input  placeholder="作者ID" style="width: 300px;"/>
    </el-form-item>
    </el-form-item>
    <el-form-item label="性别">
      <el-select  placeholder="gender" style="width: 100px;">
        <el-option label="男" />
        <el-option label="女" />
      </el-select>
    </el-form-item>
    <el-form-item label="地址">
        <el-input  placeholder="现居地址" style="width: 300px;"/>
    </el-form-item>
    <el-form-item label="年龄">
        <el-input  placeholder="11" style="width: 100px;"/>
    </el-form-item>
    <el-form-item label="邮箱">
        <el-input  placeholder="11" style="width: 300px;"/>
    </el-form-item>
    <el-form-item label="入学年份">
        <el-input  placeholder="11" style="width: 100px;"/>
    </el-form-item>
    <el-form-item label="专业">
        <el-input  placeholder="11" style="width: 100px;"/>
    </el-form-item>
    <el-form-item label="班级">
        <el-input  placeholder="11" style="width: 100px;"/>
    </el-form-item>
  </el-form>
   <el-row>
    profile:
   </el-row>
   <el-row>
        <el-col :span="4">
            <el-avatar shape="square" :size="150" :fit="fit" :src="url" />
        </el-col>
        <el-col :span="4">
            <el-upload
    class="avatar-uploader"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
        </el-col>
   </el-row>
   <el-row>
    <el-col :span="3" :offset="2">
        <el-button type="primary" size="small">还原默认头像</el-button>
    </el-col>
   </el-row>
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
</style>
<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  text-align: center;
}
</style>