<template>
    <div>
        <el-row class="title">
            <el-col :span='2'>
                <p>新闻标题</p>
            </el-col>
            <el-col :span="12">
            <el-input v-model="newsState.title" placeholder="Please input" size='medium'/>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="2">
                <p>新闻封面</p>
            </el-col>
            <el-col :span="6">
                <el-upload v-model:file-list="fileList"
                action="/api/auth/admin/img" :on-preview="handlePreview"
                :on-remove="handleRemove" :before-remove="beforeRemove" :limit="3" :on-exceed="handleExceed">
                <el-button type="primary">Click to upload</el-button>
                <template #tip>
                    <div class="el-upload__tip">
                        jpg/png files with a size less than 500KB.
                    </div>
                </template>
            </el-upload>
            </el-col>
        </el-row>
        <el-row>
            <div class="editor">
        <v-md-editor v-model="newsState.text" height="400px" left-toolbar="undo redo bold italic h hr strikethrough ul ol quote table save clear" ></v-md-editor>
            </div>
        </el-row>
        <el-row>
            <el-col :span="2" :offset="5">
            <el-button type="primary" size="large" @click="pubNews">&nbsp;发布&nbsp;</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import {reactive} from 'vue'
import axiosInstance from '@/axios.config';
import { ElMessage } from 'element-plus';
const newsState = reactive({
    news:{
        'title':'',
        'content':'',
        'cover':''
    }
}
)
const pubNews = ()=>{
    axiosInstance.post('/api/auth/admin/news',newsState.news).then((res)=>{
        if (res.status==200) {
            ElMessage.success('创建成功');
            newsState.news.title='';
            newsState.news.content='';
            newsState.news.cover='';
        }
    })
}
</script>

<style lang="scss" scoped>
.editor {
    border: 1px solid #f56c6c;
    width: 100%;
    border-radius: 5px;
}
.el-row {
    text-align: center;
    margin:20px 0;
}
</style>