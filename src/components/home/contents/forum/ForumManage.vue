<template>
    <div>
        <el-header>
            <el-row class="table-nav" :gutter="50">
                <el-col :span="1" :offset="0">
                    <el-button type="primary">批量通过</el-button>
                </el-col>
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
            <el-table ref="postsTableRef" :data="stateTable.posts">
                <el-table-column type="selection" width="35" />
                <el-table-column label="标题" width="320">
                    <template #default="scope">{{ scope.row.title }}</template>
                    </el-table-column>
                    <el-table-column prop="author_id" label="作者ID" width="100" />
                    <el-table-column prop="state" label="状态" width="100" :filters="[
                            { text: '置顶', value: 1 },
                            { text: '正常', value: 2 },
                            { text: '已隐藏', value: 3 },
                          ]" :filter-method="filterTag" filter-placement="bottom-end">
                        <template #default="scope">
                            <el-tag :type="typeJudge(scope.row.state)">{{ tagJudge(scope.row.state) }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column property="created_time" label="创建时间" width="300" sortable/>
                <el-table-column property="updated_time" label="更新时间" width="300" sortable/>
                <el-table-column fixed="right" label="操作" width="350">
                    <template #default="scope">
                        <el-button link type="primary" size="small" @click.prevent="handleDetail(scope.$index)">详情</el-button>
                        <el-button link type="primary" size="small" @click.prevent="handleTop(scope.$index)">置顶</el-button>
                        <el-button link type="primary" size="small" @click.prevent="handleHide(scope.$index)">隐藏</el-button>
                        <el-button link type="primary" size="small" @click.prevent="handleDelete(scope.$index)">删除</el-button>
                    </template>
    </el-table-column>
            </el-table>


<el-dialog v-model="dialogVisible" :title="stateTable.currentPost.title" width="60%" center>
    <el-form :inline="true" class="">
    <el-form-item label="作者">
      <el-input  placeholder="作者ID" disabled/>
    </el-form-item>
    <el-form-item label="状态">
      <el-select >
        <el-option label="置顶" value=1 />
        <el-option label="正常" value=2 />
        <el-option label="已隐藏" value=3 />
      </el-select>
    </el-form-item>
  </el-form>
     <el-form-item label="创建时间">
      <el-col :span="8">
        <el-input disabled></el-input>
      </el-col>
      <el-col :span="2" class="text-center" :offset="1">
        <span class="text-gray-500">更新时间</span>
      </el-col>
      <el-col :span="8">
        <el-input disabled></el-input>
      </el-col>
    </el-form-item>
    <el-table :data="stateTable.comments" style="width: 100%" max-height="250">
    <el-table-column type="selection" width="35" />
    <el-table-column prop="content" label="评论" width="300" />
    <el-table-column prop="author_id" label="用户ID" width="120" />
    <el-table-column prop="post_id" label="帖子ID" width="120" />
    <el-table-column prop="created_time" label="创建时间" width="300" sortable/>
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button
          link
          plain
          type="primary"
          size="small"
          @click.prevent="deleteRow(scope.$index)"
        >
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
            <el-pagination v-model:current-page="currentPage" :page-size="100" small
                background layout="total, prev, pager, next" :total="1000"  />
        </el-footer>
    </div>
</template>

<script setup>
import axiosInstance from '@/axios.config';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { onMounted } from 'vue'

onMounted(() => {
  axiosInstance.get('/api/auth/posts/b/0?offset=10&limit=10').then((res)=>{
    stateTable.posts=res.data.posts;
  })
})

const searchWord = ref('')
const dialogVisible = ref(false)
const currentPage =1
const stateTable = reactive(
  {
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
          "state": 1,
          "block_id": 79,
          "is_lock": false,
          "id": 37
        }
  })
const filterTag = (value,row) => {
  row.state===value
}
const typeJudge = (state) => {
  if(state==1) return 'danger'
  if(state==2) return 'success'
  if(state==3) return 'info'
}
const tagJudge = (state) => {
  if(state==1) return '置顶'
  if(state==2) return '正常'
  if(state==3) return '已隐藏'
}
const handleDetail = (index)=> {
  dialogVisible.value=true;
  let url = '/api/auth/posts/p/'+stateTable.posts[index].id
  axiosInstance.get(url).then((res)=>{
      stateTable.comments=res.data.comment
      stateTable.currentPost = res.data.post
  })
}
const handleTop = (index)=> {
  stateTable.posts[index].state=1
  axiosInstance.post()
}
const handleHide = (index)=> {
  stateTable.posts[index].state=1
  axiosInstance.post()
}
const handleDelete = (index)=>{
  stateTable.posts[index].state=1
  axiosInstance.post()
}
const deleteRow = (index)=> {
  let url = '/api'+stateTable.comments[index].id
  axiosInstance.delete(url).then((res)=>{
    if (res.status==200) {
      stateTable.comments.splice(index,1)
      ElMessage.success('评论删除成功')
    }
  })
}
</script>

<style lang="scss" scoped>

</style>