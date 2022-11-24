<template>
    <div>
        <el-row class="title">
            <el-col :span='2'>
                <p>活动标题</p>
            </el-col>
            <el-col :span="12">
            <el-input v-model="input" placeholder="Please input" size='medium'/>
            </el-col>
        </el-row>
        <el-row class="title">
            <el-col :span='2'>
                <p>起止时间</p>
                </el-col>
                <el-col :span="4">
                    <el-date-picker v-model="startTime" type="datetime" placeholder="Select date and time" />
                </el-col>
                <el-col :span='1'>
                <p>──</p>
                </el-col>
                <el-col :span="4">
                    <el-date-picker v-model="endTime" type="datetime" placeholder="Select date and time" />
                </el-col>
                </el-row>
        <el-row>
            <div class="editor">
        <v-md-editor v-model="text" height="400px" left-toolbar="undo redo bold italic h hr strikethrough ul ol quote table save clear" ></v-md-editor>
            </div>
        </el-row>
        <el-row>
            <el-col :span="9" :offset="0">
                <div class="mapWrap">
                    <div class='location' style="height:10px;width:10px;background-color:red"></div>
                    <el-image style="width: 800px; height: auto" :src="url" class="img"
                fit="scale-down" @click='getXY'/>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="2" :offset="5">
            <el-button type="primary" size="large">&nbsp;发布&nbsp;</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import {ref} from 'vue'
const text = ref('text')
const url = '/img/map.png'

const x = ref(0-502)
const y = ref(0)
const getXY = (e)=> {
    console.log(e);
    console.log(e.offsetX);
    x.value=e.offsetX;
    y.value=e.offsetY;  
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
    top: v-bind(x);
    left: v-bind(y);
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