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
            <el-table :data="usersState.users" style="width: 100%">
                <el-table-column type="selection" width="35" />
                    <el-table-column property="nickname" label="用户昵称" width="200" />
                    <el-table-column property="username" label="用户姓名" width="200" />
                    <el-table-column property="student_id" label="学号" width="100" />
                    <el-table-column property="mail" label="用户邮箱" width="300" />
                    <el-table-column property="residence" label="用户住址" width="200" />
                    <el-table-column property="entrance_time" label="入学时间" width="300" sortable :formatter='timeformat'/>
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click="handleUserDetail(scope.$index)">详情</el-button>
                        <el-button link type="primary" size="small" @click="handleUserDel(scope.$index, scope.row)">删除</el-button>
                    </template>
    </el-table-column>
            </el-table>


<el-dialog v-model="dialogVisible" :title="usersState.currentUser.nickname" width="60%" center>
    <el-form :inline="true" class="">
    <el-form-item label="用户昵称">
      <el-input  placeholder="用户昵称" style="width: 100px;" v-model='usersState.currentUser.nickname'/>
    </el-form-item>
    <el-form-item>
        <el-form-item label="电话">
      <el-input  placeholder="911" style="width: 150px;" v-model='usersState.currentUser.phone'/>
    </el-form-item>
    </el-form-item>
    <el-form-item :label="gender">
      <el-select  placeholder="gender" style="width: 100px;" v-model='gender' default-first-option>
        <el-option label="男" value='true'/>
        <el-option label="女" value='false'/>
      </el-select>
    </el-form-item>
    <el-form-item label="地址">
        <el-input  placeholder="现居地址" style="width: 300px;" v-model='usersState.currentUser.residence'/>
    </el-form-item>
    <el-form-item label="年龄">
        <el-input  placeholder="11" style="width: 100px;" v-model='usersState.currentUser.age'/>
    </el-form-item>
    <el-form-item label="邮箱">
        <el-input  placeholder="" style="width: 300px;" v-model='usersState.currentUser.mail'/>
    </el-form-item>
    <el-form-item label="入学年份">
        <el-input  placeholder="" style="width: 100px;" v-model='usersState.currentUser.entrance_time'/>
    </el-form-item>
    <el-form-item label="学号">
        <el-input  placeholder="" style="width: 100px;" v-model='usersState.currentUser.student_id'/>
    </el-form-item>
    <el-form-item label="班级">
        <el-input  placeholder="" style="width: 100px;" v-model='usersState.currentUser.class_id'/>
    </el-form-item>
    <el-form-item label="职业">
        <el-input  placeholder="" style="width: 100px;" v-model='usersState.currentUser.job'/>
    </el-form-item>
    <el-form-item label="电话">
        <el-input  placeholder="" style="width: 100px;" v-model='usersState.currentUser.phone'/>
    </el-form-item>
  </el-form>
   <el-row>
    profile:
   </el-row>
   <el-row>
        <el-col :span="4">
            <el-avatar shape="square" :size="150" fit="fit" :src="usersState.currentUser.avatar" />
        </el-col>
        <el-col :span="4">
            <el-upload
        class="avatar-uploader"
        action=''
        :show-file-list="false"
        :before-upload="uploadImage"
  >
    <!-- <img :src="usersState.currentUser.avatar" class="avatar" /> -->
    <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
        </el-col>
   </el-row>
   <el-row>
    <el-col :span="3" :offset="2">
        <el-button type="primary" size="small" disabled>还原默认头像</el-button>
    </el-col>
   </el-row>
    <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="saveUser">
                保存
            </el-button>
        </span>
    </template>
</el-dialog>
        </el-main>
        <el-footer>
            <el-pagination v-model:current-page="currentPage" :page-size="100" small
                background layout="total, prev, pager, next" :total="1000" />
        </el-footer>
    </div>
</template>

<script setup>
import { ref,reactive,computed } from 'vue';
import axiosInstance from '@/axios.config';
import { onMounted } from 'vue'
import ElMessage from 'element-plus'
onMounted(() => {
  axiosInstance.get('/api/auth/admin/user/?offset=0&limit=10').then((res)=>{
    usersState.users=res.data.data;
  })
})
const gender= computed(() => {
  return usersState.currentUser.gender==true ? '男' : '女'
})
const timeformat = (row)=> {
    return new Date(row.entrance_time*1000).toLocaleString()
}
const searchWord = ref('')
const dialogVisible = ref(false)
const currentPage=ref(1)
const usersState = reactive({
    users:[
        {
            'id':1,
            'mail':'222222@222.com',
            'nickname':'jjjjj',
            'username':'梅西',
            'avatar':'url',
            'student_id':"032000000",
            'phone':'911',
            'gender':1,
            'age':19,
            'job':'student',
            'entrance_time':22222222222,
            'class_id':111,
            'residence':'fuzhou,fujian'
        }
    ],
    currentUser:{
            'id':1,
            'mail':'222222@222.com',
            'nickname':'jjjjj',
            'username':'梅西',
            'avatar':'url',
            'student_id':"032000000",
            'phone':'911',
            'gender':1,
            'age':19,
            'job':'student',
            'entrance_time':22222222222,
            'class_id':111,
            'residence':'fuzhou,fujian'
        }
})
const saveUser = ()=> {
    axiosInstance.put('/api/auth/admin/user/',usersState.currentUser).then((res)=>{
        if (res.status==200) {
            ElMessage.success('保存成功')
            setTimeout(()=>{
                dialogVisible.value=false;
            },1000)
        }
    })
}
const handleUserDel = (index)=>{
  axiosInstance.post('/api/auth/admin/user/'+usersState.users[index].id).then((res)=>{
    if (res.status==200) {
      usersState.users.splice(index,1);
      ElMessage.success('删除成功')
    }
  })
}
const handleUserDetail = (index)=> {
  dialogVisible.value=true;
  console.log(index);
  usersState.currentUser = usersState.users[index]
}
const uploadImage =(
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
            
            usersState.currentUser.avatar = res.data.data;
            console.log(usersState.currentUser);
        }
    })
}
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
//   color: #8c939d;
  width: 150px;
  height: 150px;
  text-align: center;
}
</style>