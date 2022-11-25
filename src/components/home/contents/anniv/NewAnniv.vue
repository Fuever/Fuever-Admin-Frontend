<template>
    <div>
        <el-row class="title">
            <el-col :span='2'>
                <p>活动标题</p>
            </el-col>
            <el-col :span="12">
            <el-input v-model="annivState.anniv.title" placeholder="Please input" />
            </el-col>
        </el-row>
        <el-row class="title">
            <el-col :span='2'>
                <p>起止时间</p>
                </el-col>
                <el-col :span="4">
                    <el-date-picker v-model="startTime" type="datetime" placeholder="Select date and time" format="YYYY/MM/DD HH:mm:ss" />
                </el-col>
                <el-col :span='1'>
                <p>──</p>
                </el-col>
                <el-col :span="4">
                    <el-date-picker v-model="endTime" type="datetime" placeholder="Select date and time" format="YYYY/MM/DD HH:mm:ss" />
                </el-col>
                </el-row>
        <el-row>
            <div class="editor">
        <v-md-editor v-model="annivState.anniv.content" height="400px" left-toolbar="undo redo bold italic h hr strikethrough ul ol quote table save clear" ></v-md-editor>
            </div>
        </el-row>
        <el-row>
            <el-col :span="9" :offset="0">
                <div class="mapWrap">
                    <div class='location' style="height:10px;width:10px;background-color:red;border-radius: 5px;"></div>
                    <el-image style="width: 800px; height: auto" :src="url" class="img"
                fit="scale-down" @click='getXY'/>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="2" :offset="5">
            <el-button type="primary" @click="pubAnniv">&nbsp;发布&nbsp;</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {reactive} from 'vue'
import axiosInstance from '@/axios.config';
import { ElMessage } from 'element-plus';
const startTime = ref(0)
const endTime = ref(0)
const annivState = reactive({
    anniv:{
        title:'',
        content:'',
        start:0,
        end:0,
        position_x:0.0,
        position_y:0.0,
    }
}
)
const computeTS = ()=>{
    annivState.anniv.start=startTime.value.getTime();
    annivState.anniv.end=endTime.value.getTime();
    annivState.anniv.position_x=parseInt(x.value.slice(0,-2))/800;
    annivState.anniv.position_y=parseInt(y.value.slice(0,-2))/502;
}
const pubAnniv = ()=>{
    computeTS();
    axiosInstance.post('/api/auth/admin/anniv/',annivState.anniv).then((res)=>{
        if (res.status==200) {
            ElMessage.success('创建成功');
            annivState.anniv.title='';
            annivState.anniv.content='';
            annivState.anniv.start=0;
            annivState.anniv.end=0;
            annivState.anniv.position_x=0.0;
            annivState.anniv.position_y=0.0;
        }
    })
}
const url = '/img/map.png'

const x = ref('0px')
const y = ref('0px')
const getXY = (e)=> {
    x.value=e.offsetX+'px';
    y.value=e.offsetY+'px';  
}

</script>

<style lang="scss" scoped>
.mapWrap {
    position: relative;
}
.img {
    position: relative;
    top: 0px;
    left:0px;
}
.location {
    position: absolute;
    top: v-bind(y);
    left: v-bind(x);
    z-index: 1000;
}
.editor {
    border: 1px solid #f56c6c;
    width: 100%;
    border-radius: 5px;
}
.el-row {
    text-align: center;
    margin:20px 0;
    vertical-align: bottom;
}
.el-col {
    text-align: center;
    vertical-align: bottom;
}
</style>