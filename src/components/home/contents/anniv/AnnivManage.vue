<template>
    <div>
        <el-header>
            <el-row class="table-nav" :gutter="50">
                <el-col :span="10" :offset="6">
                    <el-input v-model="searchWord" placeholder="输入关键词以查找" class="input-with-select">
                        <template #append>
                            <el-button type="primary" size @click="search">
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
            <el-table :data="annivState.annivs" style="width: 100%">
                <el-table-column type="selection" width="35" fixed/>
                <el-table-column label="活动名称" width="350" fixed>
                    <template #default="scope">{{ scope.row.title }}</template>
                    </el-table-column>
                    <el-table-column property="admin_id" label="管理员ID" width="200" />
                    <el-table-column property="start" label="开始时间" width="300" sortable :formatter='timeformat1'/>
                    <el-table-column property="end" label="结束时间" width="300" sortable :formatter='timeformat2'/>
                    <el-table-column property="content" label="内容" sortable/>
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="handleDetail(scope.$index)">详情</el-button>
                        <el-button link type="primary" size="small" @click="handleDel(scope.$index)">删除</el-button>
                    </template>
    </el-table-column>
            </el-table>

<el-dialog v-model="dialogVisible" title="" width="60%" center>
    <el-form :inline="true" class="">
    <el-form-item label="活动标题" style="width: 100%;">
      <el-input  placeholder="标题" style="width: 100%;" v-model='annivState.currentAnniv.title'/>
    </el-form-item>
    </el-form>
    <el-row class="title">
        <el-col :span='2'>
            <p>起止时间</p>
        </el-col>
        <el-col :span="4">
            <el-date-picker v-model="annivState.currentAnniv.start" type="datetime" placeholder="Select date and time" format="YYYY/MM/DD HH:mm:ss"/>
        </el-col>
        <el-col :span='1' :offset="1">
            <p>-</p>
        </el-col>
        <el-col :span="4">
            <el-date-picker v-model="annivState.currentAnniv.end" type="datetime" placeholder="Select date and time" format="YYYY/MM/DD HH:mm:ss"/>
        </el-col>
    </el-row>
    <div class="editor">
        <v-md-editor v-model="annivState.currentAnniv.content" height="400px" left-toolbar="undo redo bold italic h hr strikethrough ul ol quote table save clear" ></v-md-editor>
            </div>

    <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="saveAnniv">
                保存
            </el-button>
        </span>
    </template>
</el-dialog>
        </el-main>
        <el-footer>
            <el-pagination v-model:current-page="currentPage" :page-size="100" small
                layout="prev, pager, next" :total="1000" @current-change="handleCurrentChange"/>
        </el-footer>
    </div>
</template>

<script setup>
import { ref,reactive,onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import axiosInstance from '@/axios.config';
// import { computed } from '@vue/reactivity';
onMounted(() => {
  axiosInstance.get('/api/pub/anniv?limit=20&offset=0').then((res) => {
    annivState.annivs = res.data.data;
    annivState.currentAnniv = annivState.annivs[0].id;
  })
})
const timeformat1 = (row)=>{
    return new Date(row.start*1000).toLocaleString()
}
const timeformat2 = (row)=>{
    return new Date(row.end*1000).toLocaleString()
}
const searchWord = ref('')
const dialogVisible = ref(false)
const currentPage=ref(1)
// const timeformat = (cellValue)=>{
//     return new Date(cellValue).toLocaleString();
// }
const annivState = reactive({
    annivs:[

    ],
    currentAnniv:{

    }
})
const saveAnniv = ()=> {
    annivState.currentAnniv.start = annivState.currentAnniv.start/1000;
    annivState.currentAnniv.end = annivState.currentAnniv.end/1000;
    axiosInstance.put('/api/auth/admin/anniv/',annivState.currentAnniv).then((res)=>{
    if (res.status==200) {
        ElMessage.success('保存成功');
        setTimeout(()=>{
            dialogVisible.value = false
        },1000)
    }
  })
}
const handleDel = (index)=>{
  axiosInstance.delete('/api/auth/admin/anniv/'+annivState.annivs[index].id).then((res)=>{
    if (res.status==200) {
        ElMessage.success('删除成功');
        annivState.annivs.splice(index,1);
    }
  })
}
const handleDetail = (index)=> {
  dialogVisible.value = true  
  annivState.currentAnniv = annivState.annivs[index]
  annivState.currentAnniv.start*=1000
  annivState.currentAnniv.end*=1000
}
const handleCurrentChange  = (val)=>{
    console.log(val);
    axiosInstance.get('/api/pub/anniv?limit=20&offset='+(val-1)*20).then((res) => {
    annivState.annivs = res.data.data;
    annivState.currentAnniv = annivState.annivs[0].id;
  })
}
const search = ()=>{
    
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