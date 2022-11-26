<template>
  <div>
    <el-header>
      <el-row class="table-nav" :gutter="50">
        <el-col :span="4" :offset="0">
          <el-select v-model="currentblock" class="m-2" placeholder="Select" size="large" @change="handleChange(val)">
            <el-option v-for="item in stateTable.blocks" :key="item.id" :label="item.title" :value="item.id" />
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-input v-model="newblock" placeholder="" />
        </el-col>
        <el-col :span="1">
          <el-button type="primary" @click="addblock">创建板块</el-button>
        </el-col>
        <el-col :span="8" :offset="6">
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
      <el-table ref="postsTableRef" :data="stateTable.posts">
        <el-table-column type="selection" width="35" fixed/>
        <el-table-column label="标题" width="320" fixed>
          <template #default="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column prop="author_name" label="作者昵称" width="100" />
        <el-table-column prop="state" label="状态" width="150" :filters="[
          { text: '置顶', value: 1 },
          { text: '正常', value: 0 },
          { text: '已隐藏', value: 2 },
        ]" :filter-method="filterTag" filter-placement="bottom-end">
          <template #default="scope">
            <el-tag :type="typeJudge(scope.row.state)">{{ tagJudge(scope.row.state) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column property="created_time" label="创建时间" width="300" sortable :formatter='timeformat1'/>
        <el-table-column property="updated_time" label="更新时间" width="300" sortable :formatter='timeformat2'/>
        <el-table-column fixed="right" label="操作" width="250">
          <template #default="scope">
            <el-button link type="primary" size="small" @click.prevent="handleDetail(scope.$index)">详情</el-button>
            <el-button link type="primary" size="small" @click.prevent="handleTop(scope.$index)">置顶</el-button>
            <!-- <el-button link type="primary" size="small" @click.prevent="handleHide(scope.$index)">隐藏</el-button> -->
            <el-button link type="primary" size="small" @click.prevent="handleDelete(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>


      <el-dialog v-model="dialogVisible" :title="stateTable.currentPost.title" width="60%" center>
        <el-form :inline="true" class="">
          <el-form-item label="作者">
            <el-input placeholder="作者ID" disabled />
          </el-form-item>
          <el-form-item label="状态">
            <!-- <el-select v-model="stateTable.currentPost.state" :on-change="handleChange">
              <el-option label="正常" value=0 />
              <el-option label="置顶" value=1 />
              <el-option label="已隐藏" value=2 />
            </el-select> -->
          </el-form-item>
        </el-form>
        <el-form-item label="创建时间">
          <el-col :span="8">
            <el-input disabled v-model="stateTable.currentPost.created_time"></el-input>
          </el-col>
          <el-col :span="2" class="text-center" :offset="1">
            <span class="text-gray-500">更新时间</span>
          </el-col>
          <el-col :span="8">
            <el-input disabled  v-model="stateTable.currentPost.updated_time"></el-input>
          </el-col>
        </el-form-item>
        <el-table :data="stateTable.comments" style="width: 100%" max-height="250">
          <el-table-column type="selection" width="35" />
          <el-table-column prop="content" label="评论" width="300" />
          <el-table-column prop="author_name" label="用户名" width="120" />
          <el-table-column prop="post_id" label="帖子ID" width="120" />
          <el-table-column prop="created_time" label="创建时间" width="300" sortable />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button link plain type="primary" size="small" @click.prevent="deleteRow(scope.$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
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
      <el-pagination v-model:current-page="currentPage" :page-size="100" small background
        layout="total, prev, pager, next" :total="1000" />
    </el-footer>
  </div>
</template>

<script setup>
import axiosInstance from '@/axios.config';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { onMounted } from 'vue'

onMounted(() => {
  axiosInstance.get('/api/pub/block/?limit=20&offset=0').then((res) => {
    stateTable.blocks = res.data.data;
    currentblock.value = stateTable.blocks[0].id;
  }).then(
    axiosInstance.get('/api/pub/posts/b/'+currentblock.value.toString()+'?offset=0&limit=20').then((res) => {
    stateTable.posts = res.data.data;
  })
  )
})

const searchWord = ref('')
const dialogVisible = ref(false)
const currentPage = 1
const currentblock = ref(1)
const newblock = ref('')
const stateTable = reactive(
  {
    blocks: [
    ],
    posts:
      [
        {
          "author_id": 46,
          "title": "离层思准次",
          "created_time": 502778903776,
          "updated_time": 1542380569012,
          "state": 1,
          "block_id": 79,
          "is_lock": false,
          "id": 37
        }
      ],
    comments:
      [
        {
          "id": 89,
          "author_id": 49,
          "content": "irure esse anim",
          "post_id": 16,
          "created_time": 1669045025
        },
        {
          "id": 12,
          "author_id": 81,
          "content": "eu magna",
          "post_id": 62,
          "created_time": 1669045025
        }
      ],
    currentPost: {
      "author_id": 46,
      "title": "离层思准次",
      "created_time": 502778903776,
      "updated_time": 1542380569012,
      "state": "",
      "block_id": 79,
      "is_lock": false,
      "id": 37
    }
  })
const timeformat1 = (row)=> {
    return new Date(row.created_time*1000).toLocaleString()
}
const timeformat2 = (row)=> {
    return new Date(row.updated_time*1000).toLocaleString()
}
const addblock = ()=> {
  axiosInstance.post('/api/auth/admin/block/',{'title':newblock.value}).then((res)=>{
    if (res.status==200) {
      ElMessage.success("创建成功")
      axiosInstance.get('/api/pub/block/?limit=20&offset=0').then((res) => {
    stateTable.blocks = res.data.data;
    currentblock.value = stateTable.blocks[0].id;
  })
    }
  })
}
const filterTag = (value, row) => {
  console.log(value,row);
  return row.state === value
}
const typeJudge = (state) => {
  if (state == 1) return 'danger'
  if (state == 0) return 'success'
  if (state == 2) return 'info'
}
const tagJudge = (state) => {
  if (state == 1) return '置顶'
  if (state == 0) return '正常'
  if (state == 2) return '已隐藏'
}
const handleDetail = (index) => {
  dialogVisible.value = true;
  let url = '/api/pub/posts/p/' + stateTable.posts[index].id.toString()+'?limit=20&offset=0'
  axiosInstance.get(url).then((res) => {
    stateTable.comments = res.data.data.comment;
    stateTable.currentPost = res.data.data.post;
  })
}
const handleTop = (index) => {
  stateTable.posts[index].state = 1
  axiosInstance.put('/api/auth/admin/posts/',{
    id:stateTable.posts[index].id,
    state:stateTable.posts[index].state
  }).then((res)=>{
    if (res.status==20) {
      ElMessage.success('修改成功')
    }
  })
}
// const handleHide = (index) => {
//   stateTable.posts[index].state = 1
//   axiosInstance.post()
// }
const handleDelete = (index) => {
  stateTable.posts[index].state = 1
  axiosInstance.delete('/api/auth/admin/posts/'+stateTable.posts[index].id.toString()).then((res) => {
    if (res.status == 200) {
      stateTable.posts.splice(index,1);
      ElMessage.success('删除成功！')
    }
  })
}
const deleteRow = (index) => {
  let url = '/api/auth/admin/comment/' + stateTable.comments[index].id
  axiosInstance.delete(url).then((res) => {
    if (res.status == 200) {
      stateTable.comments.splice(index, 1)
      ElMessage.success('评论删除成功')
    }
  })
}
const handleChange = () => {
  axiosInstance.get('/api/pub/posts/b/'+currentblock.value.toString()+'?offset=0&limit=20').then((res) => {
    stateTable.posts = res.data.data;
  })
}
</script>

<style lang="scss" scoped>

</style>