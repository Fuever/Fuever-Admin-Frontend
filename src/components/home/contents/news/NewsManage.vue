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
            <el-table :data="newsState.news" style="width: 100%">
                <el-table-column type="selection" width="35" />
                <el-table-column property="title" label="标题" width="100" />
                <el-table-column property="author_id" label="管理员ID" width="100" />
                <el-table-column property="create_time" label="创建时间" width="300" sortable />
                <el-table-column property="authorID" label="描述" width="350" />
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default>
                        <el-button link type="primary" size="small" @click="handleDetail">详情</el-button>
                        <el-button link type="primary" size="small" @click="handleDel">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>


<el-dialog v-model="dialogVisible" :title="newsState.news.title" width="60%" center>
    <el-form :inline="true" class="">
    <el-form-item label="新闻标题" style="width: 100%;">
      <el-input  placeholder="标题" style="width: 100%;"/>
    </el-form-item>
    </el-form>
   
    <div class="editor">
        <v-md-editor v-model="text" height="400px" left-toolbar="undo redo bold italic h hr strikethrough ul ol quote table save clear" ></v-md-editor>
            </div>

    <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogVisible = false">
                保存
            </el-button>
        </span>
    </template>
</el-dialog>

        </el-main>
        <el-footer>
            <el-pagination v-model:current-page="currentPage" :page-size="100" :small="small"
                background layout="total, prev, pager, next" :total="1000" />
        </el-footer>
    </div>
</template>

<script setup>
import { ref,reactive } from 'vue';
import axiosInstance from '@/axios.config';
const searchWord = ref('')
const dialogVisible = ref(false)
const currentPage = ref(1)
const newsState = reactive({
    news:[

    ],
    currentnew:{

    }
})
const handleDel = (index)=>{
  newsState.news.splice(index,1)
  axiosInstance.post()
}
const handleDetail = (index)=> {
  dialogVisible.value=true;
  let url = '/api/auth/user/'+newsState.news[index].id
  axiosInstance.get(url).then((res)=>{
      newsState.currentnew = res.data.user
  })
}
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