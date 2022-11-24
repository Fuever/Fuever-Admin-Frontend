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
const newsState = reactive({
    news:{
        'title':'',
        'text':''
    }
}
)
const pubNews = ()=>{
    axiosInstance.post().then((res)=>{
        console.log(res);
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