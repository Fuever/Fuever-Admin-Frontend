<template>
    <div>
        <el-header>
            <el-row class="table-nav" :gutter="50">
                <el-col :span="10" :offset="6">
                    <el-input v-model="searchWord" placeholder="输入关键词以查找" class="input-with-select">
                        <template #append>
                            <el-button type="primary" size>
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
                <el-table-column type="selection" width="35" fixed/>
                <el-table-column property="title" label="标题" width="00" fixed/>
                <el-table-column property="author_id" label="管理员ID" width="200" />
                <el-table-column property="create_time" label="创建时间" width="300" sortable />
                <el-table-column property="authorID" label="描述" width="350" />
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="handleDetail(scope.$index)">详情</el-button>
                        <el-button link type="primary" size="small" @click="handleDel(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>


<el-dialog v-model="dialogVisible" :title="newsState.currentnew.title" width="60%" center>
    <el-form :inline="true" class="">
    <el-form-item label="新闻标题" style="width: 100%;">
      <el-input  placeholder="标题" v-model="newsState.currentnew.title" style="width: 100%;"/>
    </el-form-item>
    </el-form>
    <el-row>
            <el-col :span="2">
                <p>新闻封面</p>
            </el-col>
            <el-col :span="6">
                <el-upload
                action="" :before-upload="uploadcover" :limit="1">
                <el-button type="primary">Click to upload</el-button>
                <template #tip>
                    <div class="el-upload__tip">
                        jpg/png files with a size less than 500KB.
                    </div>
                </template>
            </el-upload>
            </el-col>
            <el-row :span="6">
                <el-image v-if="newsState.currentnew.cover!=''" style="width: 100px; height: 60px" :src="newsState.currentnew.cover" fit="fit" />
            </el-row>
        </el-row>
    <div class="editor">
        <v-md-editor v-model="newsState.currentnew.content" height="400px" left-toolbar="undo redo bold italic h hr strikethrough ul ol quote table save clear" ></v-md-editor>
            </div>

    <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="saveNews">
                保存
            </el-button>
        </span>
    </template>
</el-dialog>

        </el-main>
        <el-footer>
            <el-pagination v-model:current-page="currentPage" :page-size="100" small
                background layout="prev, pager, next" :total="1000"  @current-change="handleCurrentChange"/>
        </el-footer>
    </div>
</template>

<script setup>
import { ref,reactive,onMounted } from 'vue';
import axiosInstance from '@/axios.config';
import { ElMessage } from 'element-plus';
onMounted(() => {
  axiosInstance.get('/api/pub/news/?limit=20&offset=0').then((res) => {
    newsState.news = res.data.data;
    newsState.currentnew = newsState.news[0].id;
  })
})
const searchWord = ref('')
const dialogVisible = ref(false)
const currentPage = ref(1)
const newsState = reactive({
    news:[

    ],
    currentnew:{

    }
})

const uploadcover =(
  uploadFile
) => {
    let formData = new FormData();
    formData.append('image', uploadFile);
    let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    axiosInstance.post('/api/auth/admin/img/', formData, config).then((res) => {
        if (res.status === 200) {
            newsState.currentnew.cover = res.data.data;
        }
    })
}
const saveNews = ()=> {
    axiosInstance.put('/api/auth/admin/news/',newsState.currentnew).then((res)=>{
    if (res.status==200) {
        ElMessage.success('保存成功');
    }
  })
}
const handleDel = (index)=>{
  axiosInstance.delete('/api/auth/admin/news/'+newsState.news[index].id.toString()).then((res)=>{
    if (res.status==200) {
        ElMessage.success('删除成功');
        newsState.news.splice(index,1);
    }
  })
}
const handleDetail = (index)=> {
  dialogVisible.value = true  
  newsState.currentnew = newsState.news[index]
}
const handleCurrentChange = (val)=>{
    axiosInstance.get('/api/pub/news/?limit=20&offset='+(val-1)*20).then((res) => {
    newsState.news = res.data.data;
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