<template>
  <div>
    <el-main>
      <el-table :data="galleryState.galleries" style="width: 100%">
        <el-table-column type="selection" width="35" fixed />
        <el-table-column label="活动名称" width="350" fixed>
          <template #default="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column property="author_id" label="创建者ID" width="200" />
        <el-table-column
          property="create_time"
          label="创建时间"
          sortable
          :formatter="timeformat1"
        />

        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleDetail(scope.$index)"
              >详情</el-button
            >
            <el-button
              link
              type="primary"
              size="small"
              @click="handleDel(scope.$index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-dialog v-model="dialogVisible" title="详情" width="60%" center>
        <el-row>
          <el-col :span="3">
            <div>名称</div>
          </el-col>
          <el-col :span="20">
            <div>
              {{ galleryState.currentGallery.title }}
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <div>创建时间</div>
          </el-col>
          <el-col :span="20">
            <div>
              {{
                new Date(
                  galleryState.currentGallery.create_time * 1000
                ).toLocaleString()
              }}
            </div>
          </el-col>
        </el-row>
        <div class="editor">
          <v-md-editor
            v-model="galleryState.currentGallery.content"
            height="400px"
            left-toolbar="undo redo bold italic h hr strikethrough ul ol quote table save clear"
            mode="preview"
          ></v-md-editor>
        </div>
      </el-dialog>
    </el-main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import axiosInstance from "@/axios.config";
// import { computed } from '@vue/reactivity';
onMounted(() => {
  axiosInstance.get("/api/pub/gallery/").then((res) => {
    galleryState.galleries = res.data.data;
    galleryState.currentgallery = galleryState.galleries[0].id;
  });
});
const timeformat1 = (row) => {
  return new Date(row.create_time * 1000).toLocaleString();
};
const dialogVisible = ref(false);

// const timeformat = (cellValue)=>{
//     return new Date(cellValue).toLocaleString();
// }
const galleryState = reactive({
  galleries: [],
  currentGallery: {},
});

const handleDel = (index) => {
  axiosInstance
    .delete("/api/auth/admin/gallery/" + galleryState.galleries[index].id)
    .then((res) => {
      if (res.status == 200) {
        ElMessage.success("删除成功");
        galleryState.galleries.splice(index, 1);
      }
    });
};
const handleDetail = (index) => {
  axiosInstance
    .get("/api/pub/gallery/" + galleryState.galleries[index].id)
    .then((res) => {
      if (res.status == 200) {
          dialogVisible.value = true
          galleryState.currentGallery = res.data.data
          console.log("aaa", galleryState.currentGallery);
      }
    });
  
  
  
};
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
